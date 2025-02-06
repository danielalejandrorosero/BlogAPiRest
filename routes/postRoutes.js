import express from 'express';
import * as postController from '../controllers/postController.js'; // Importa todo como postController
import verifyToken from '../middlewares/user_auth.js';  // Importar la función por defecto

const router = express.Router();

router.get('/allpost', verifyToken, postController.getAllPost);
router.post('/create-post', verifyToken, postController.createPost);
router.delete('/delete-post', verifyToken, postController.deletePost);
router.post('/create-comment', verifyToken, postController.createComment);

export default router;
