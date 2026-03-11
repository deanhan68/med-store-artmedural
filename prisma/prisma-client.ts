import { PrismaClient } from "@prisma/client/extension";
import { config } from "./prisma.config";

const prismaClientSingleton = () => new PrismaClient(config);

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
