import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userValidation from '../validations/userValidation.js';
import auth from '../middlewares/user_auth.js';

dotenv.config();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const getAllUsers = [auth, async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();

        if (allUsers.length === 0) {
            res.status(404).json({ message: 'No user found' });
        } else {
            res.status(200).json(allUsers);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting all users', error: error.message });
    }
}];

export const createAccount = async (req, res) => {
    try {
        // Validación
        const { error } = userValidation(req.body);
        if (error) {
            res.status(400).json({ message: 'Validation error', error: error.details });
            return;
        }

        // Comprobar si el usuario ya existe
        const comprobarUsuario = await prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (comprobarUsuario) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Extraer los datos y crear el usuario
        const { firstName, lastName, age, password, email, isAdmin } = req.body;

        // Encriptar la contraseña
        const hashPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const user = await prisma.user.create({
            data: { firstName, lastName, age, password: hashPassword, email, isAdmin },
        });

        // Generar el token
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET);

        res.status(201).json({ message: 'User created', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

export const getUserById = [auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error getting user by id', error: error.message });
    }
}];