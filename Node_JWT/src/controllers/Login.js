import mongoose from 'mongoose';
import User from '../models/Users.js';
import Sessions from '../models/Sessions.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils.js';

async function LoginUser(req, res) {
    try {
        const { email, password } = req.body;
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = generateToken(user);

        const activeSessions = await Sessions.find({ userId: user._id, isActive: true }).sort({ createdAt: 1 });

        if (activeSessions.length >= 2) {
            const sessionsToDeactivate = activeSessions.slice(0, activeSessions.length - 1); // Keep latest 1
            for (const s of sessionsToDeactivate) {
                s.isActive = false;
                await s.save();
            }
        }

        await Sessions.create({
            userId: user._id,
            accessToken: token,
            userAgent,
            ipAddress,
            isActive: true,
            createdAt: new Date(),
            lastUsedAt: new Date()
        });

        res.status(200).json({ user, token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Error during login' });
    }
}

export default LoginUser;
