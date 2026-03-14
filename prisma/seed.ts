import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from './prisma-client';



async function up() {


}

async function down() {
    
}

async function main() {
    try {
        await down();
        await up();
      } catch (e) {
        console.error(e);
      }
}