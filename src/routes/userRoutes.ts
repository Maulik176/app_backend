import express from 'express';
import { registerUser, createWallet, updateSegments, getUserProfile } from '../controllers/userController';

const router = express.Router();

// Register a new user
router.post('/', registerUser);
// Create a wallet for the user
router.post('/create-wallet', createWallet);
// Update selected segments for the user
router.post('/update-segments', updateSegments);
// Get user profile by profileId
router.get('/:profileId', getUserProfile);

export default router;
