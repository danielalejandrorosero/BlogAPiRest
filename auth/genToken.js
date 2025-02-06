import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();  // El resto del código sigue igual


import jwt from 'jsonwebtoken';



function genToken(user) {
    const token = jwt.sign({ id : this.id , isAdmin : this.isAdmin } , 'privatekey');
    return token;
}


export default genToken;