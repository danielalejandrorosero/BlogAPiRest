import swaggerAutogen from 'swagger-autogen';

const swaggerInstance = swaggerAutogen();

const doc = {
  info: {
    title: 'Blog API',
    description: 'Documentacion de la API De Blog',
  },
  host: 'localhost:3000',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js']; // Importa el archivo correcto

swaggerInstance(outputFile, endpointsFiles).then(async () => {
  const { default: app } = await import('./app.js'); // Importa la app después de generar Swagger
  app.listen(3000, () => {
    console.log('Server is running with Swagger at /api-docs');
  });
});
