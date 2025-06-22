import express from 'express';
import getUserByID from '../controllers/Authenticated.js';
import authenticationToken from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/user', authenticationToken, getUserByID);

export default router;