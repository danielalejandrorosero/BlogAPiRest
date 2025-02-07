import express, { json } from 'express';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

// Middleware para parseo JSON
app.use(json());

// Definición de rutas
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('/', (req, res) => {
    res.send('Servidor Levantado en el puerto 3000');
});

// Levanta el servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});