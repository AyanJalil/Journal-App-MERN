import express from 'express';
import { createJournal, getJournals, deleteJournal, editJournal } from '../controllers/JournalController.js';
import authenticationToken from '../utils/authMiddleware.js';

const router = express.Router();

// Protected route
router.post('/create-journal', authenticationToken, createJournal);
router.get('/my-journals', authenticationToken, getJournals);
router.delete('/delete/:id', authenticationToken, deleteJournal);
router.put('/edit/:journalId', authenticationToken, editJournal);


export default router;

