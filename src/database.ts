import { PrismaClient } from '@prisma/client'

// Essa é a chave que liga o código ao Docker
export const prisma = new PrismaClient()