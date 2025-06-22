
import express from 'express';
import logoutUser from '../controllers/Logout.js';
import {logoutAllSessions} from '../controllers/LogOutAllSessions.js';

import authenticationToken from '../utils/authMiddleware.js';

const router = express.Router();

router.post('/logout', authenticationToken, logoutUser);
router.post('/logout-all', authenticationToken, logoutAllSessions);

export default router;
