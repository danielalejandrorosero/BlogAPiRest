import express from 'express';
import { createAccount, getAllUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/create-account', createAccount);
router.get('/all-users', getAllUsers);
router.get('/:id', getUserById);

export default router;