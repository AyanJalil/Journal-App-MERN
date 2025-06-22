import express from 'express';
import SignupUser from '../controllers/Signup.js';

const router = express.Router();

router.post('/register', SignupUser);

export default router;