import { PrismaClient } from '@prisma/client' // aqui trazemos o Prisma Client

// Permitindo que o código todo use o Prisma Client, fazendo que não precise dar new em todos os aquivos, fazendo assim que não criemos conexões desnecessárias com o banco de dados.
export const prisma = new PrismaClient()