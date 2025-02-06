import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes.js';  // Agrega .js
import postRoutes from './routes/postRoutes.js';  // Agrega .js

const app = express();

// Conexión a Prisma (descomentado si deseas trabajar con la base de datos)
//const prisma = new PrismaClient();

// Middleware para parseo JSON
app.use(json());

// Definición de rutas
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Ejemplo de prueba de la base de datos (descomentar si necesitas probar)
/*
async function main() {
    const user = await prisma.user.create({
        data: {
            firstName: 'Daniel',
            lastName: 'Fernandes',
            age: '25',
            password: '123456',
            email: 'danielfernandes@gmail.com',
            isAdmin: true,
        },
    });
    console.log(user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
*/
app.get('/', (req, res) => {
    res.send('Servidor Levantado en el puerto 3000');
});
// Levanta el servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
