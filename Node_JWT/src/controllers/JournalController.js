import User from '../models/Users.js';

export const createJournal = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userEmail = req.user.email; // From authMiddleware

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.journals.push({ title, content });
        await user.save();

        res.status(201).json({ message: 'Journal created successfully', journals: user.journals });
    } catch (error) {
        console.error('Create Journal Error:', error);
        res.status(500).json({ message: 'Error creating journal' });
    }
};

export const getJournals = async (req, res) => {
  try {
    const userEmail = req.user.email; // Retrieved from auth middleware

    const user = await User.findOne({ email: userEmail }).select('journals');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ journals: user.journals });
  } catch (error) {
    console.error('Get Journals Error:', error);
    return res.status(500).json({ message: 'Failed to retrieve journals' });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const userId = req.user._id;
    const journalId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.journals = user.journals.filter(journal => journal._id.toString() !== journalId);
    await user.save();

    return res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (error) {
    console.error('Delete Journal Error:', error);
    return res.status(500).json({ message: 'Error deleting journal' });
  }
};

export const editJournal = async (req, res) => {
  const userEmail = req.user.email;
  const { journalId } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const journal = user.journals.id(journalId);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });

    journal.title = title;
    journal.content = content;
    await user.save();

    res.status(200).json({ message: 'Journal updated successfully', journal });
  } catch (error) {
    console.error('Edit journal error:', error);
    res.status(500).json({ message: 'Failed to update journal' });
  }
};
