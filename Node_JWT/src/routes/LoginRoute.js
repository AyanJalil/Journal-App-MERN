import express from 'express';
import LoginUser from '../controllers/Login.js';

const router = express.Router();

router.post('/login', LoginUser);

export default router;