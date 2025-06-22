import jwt from 'jsonwebtoken';
import Sessions from '../models/Sessions.js';
import User from '../models/Users.js';
import secretKey from '../configuration/jwtConfig.js';

async function authenticationToken(req, res, next) {
    const authHeader = req.header('authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid token format.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        const session = await Sessions.findOne({
            userId: decoded.id,
            accessToken: token,
            isActive: true
        });

        if (!session) {
            return res.status(401).json({ message: 'Session expired or invalidated' });
        }

        session.lastUsedAt = new Date();
        await session.save();

        req.user = await User.findById(decoded.id).select('-password');
        req.session = session;
        next();

    } catch (error) {
        console.error('JWT error:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

export default authenticationToken;
