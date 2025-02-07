# Blog API Rest

Blog API Rest es una aplicación backend construida con Node.js, Express, y Prisma. Esta API permite gestionar usuarios, crear cuentas, y manejar publicaciones de blog con autenticación mediante tokens JWT. 

Además, se incluye una documentación interactiva de la API utilizando [Swagger UI](https://swagger.io/tools/swagger-ui/).

## Funcionalidades

- **Crear cuenta de usuario**: Endpoint para registrar nuevos usuarios.
- **Obtener usuarios**: Endpoint para obtener todos los usuarios registrados.
- **Crear publicación**: Endpoint para crear publicaciones de blog.
- **Autenticación JWT**: Protege las rutas utilizando tokens JWT.

## Requisitos

- Express
- npm 
- Mysql
- Prisma

## Instalación

1. Clona este repositorio:

   git clone https://github.com/danielalejandrorosero/BlogAPiRest.git

   cd BlogAPiRest

   npm install


    JWT_SECRET=miSuperSecretaClave
    JWT_EXPIRES_IN=3600

    node swagger.js      


