import Session from '../models/Sessions.js';

export const logoutAllSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    await Session.deleteMany({ userId });

    return res.status(200).json({ message: 'Logged out from all devices successfully' });
  } catch (err) {
    console.error('Logout all error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
