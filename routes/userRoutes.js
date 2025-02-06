import express from 'express';
import * as userController from '../controllers/userController.js';
import verifyToken from '../middlewares/user_auth.js';  // Importar la función por defecto
const router = express.Router();

router.get('/alluser', verifyToken, userController.getAllUsers);
router.get('/user/:id', verifyToken, userController.getAllUsers);
router.post('/create-account', userController.createAccount);

export default router;