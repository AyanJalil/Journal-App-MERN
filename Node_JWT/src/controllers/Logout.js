import Sessions from '../models/Sessions.js';

const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'No token provided' });

        const session = await Sessions.findOneAndUpdate(
            { accessToken: token },
            { isActive: false }
        );

        if (!session) {
            return res.status(404).json({ message: 'Session not found or already logged out' });
        }

        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Logout failed' });
    }
};

export default logoutUser;
