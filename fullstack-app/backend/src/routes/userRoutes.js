import express from 'express';
import { registerUser, editUserProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.put('/edit', authenticate, editUserProfile);

export default router;