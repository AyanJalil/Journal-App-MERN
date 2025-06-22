import User from '../models/Users.js';

const logoutAll = async (req, res) => {
  try {
    const userId = req.user.id;

    // Clear all active sessions
    await User.updateOne(
      { _id: userId },
      { $set: { sessions: [] } }
    );

    return res.status(200).json({ message: 'Logged out from all devices successfully' });
  } catch (error) {
    console.error('Logout all error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default logoutAll;
