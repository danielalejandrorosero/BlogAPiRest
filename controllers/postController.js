import { PrismaClient } from '@prisma/client';  // Usar import en lugar de require
import postValidation from '../validations/postValidation.js';

import jwt from 'jsonwebtoken';  // Usar import en lugar de require
import verifyToken from '../middlewares/user_auth.js';  // Renombrar a verifyToken

const prisma = new PrismaClient();  // El resto del código sigue igual



import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function setAuthorizationHeader(req, res) {
    const token = jwt.sign({ id: req.user.id, isAdmin: req.user.isAdmin }, JWT_SECRET);
    res.header('Authorization', 'Bearer ' + token);
}




// esta funcion obtiene todos los posts la constante alluser ve todo los posts de los usuarios
export const getAllPost = [verifyToken,async (req, res) => {
    try {
        // primero autorizamos el usuario
        setAuthorizationHeader(req, res);
        const allPosts = await prisma.post.findMany();

        if (allPosts.length === 0) {
            res.status(404).json({ message: 'No user found' });
        } else {
            res.status(200).json(allPosts);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting all users' });
    }
}];


// crear post
export const createPost = [verifyToken,async (req, res) => {
    try {
        // Primero autorizamos el usuario
        setAuthorizationHeader(req, res);

        const { error } = postValidation(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation error', error: error });
        }

        const { title, content } = req.body;
        const token = req.header('x-auth-token');

        // Decodificar el token
        const decodeToken = jwt.verify(token, JWT_SECRET); // Aquí declaras la variable 'decodeToken'

        const authorId = decodeToken.id;

        // Crear el post en la base de datos
        const post = await prisma.post.create({
            data: { title, content, authorId }
        });

        res.status(201).json({ message: 'Post created', post });
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ message: 'Error creating post' });
    }
}];


// delete post
export const deletePost =  [verifyToken, async  (req, res) => {
    try {
        // Primero autorizamos el usuario
        setAuthorizationHeader(req, res);

        const { id } = req.params;
        const deletePost = await prisma.post.delete({
            where: { id }
        });
        res.status(200).json({ message: 'Post deleted', deletePost });
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ message: 'Error deleting post' });
    }
}];



export const createComment = [verifyToken, async (req, res) => {
    try {
        // Primero autorizamos el usuario
        setAuthorizationHeader(req, res);

        const { error } = commentvalidation(req.body);

        if (error) {
            return res.status(400).json({ message: 'Validation error', error: error });
        }

        const { content, postId } = req.body;

        const token = req.header('x-auth-token');
        // Decodificar el token
        const decodeToken = jwt.verify(token, JWT_SECRET); // Aquí declaras la variable 'decodeToken'
        const authorId = decodeToken.id;
        // Crear el post en la base de datos
        const comment = await prisma.comment.create({
            data: { content, postId, authorId }
        });
        res.status(201).json({ message: 'Comment created', comment });
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({ message: 'Error creating comment' });
    }
}];