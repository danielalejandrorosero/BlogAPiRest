import express, { json } from 'express';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger-output.json');

const app = express();

// Middleware para parseo JSON
app.use(json());

// Definición de rutas
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Levantado en el puerto 3000');
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Levanta el servidor
export default app;
