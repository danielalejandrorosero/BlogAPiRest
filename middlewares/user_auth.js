import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar el token
export default function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('No token provided');
    }  

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
}