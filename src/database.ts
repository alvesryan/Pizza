// src/database.ts
import { PrismaClient } from '@prisma/client'

// Cria a conexão com o banco
export const prisma = new PrismaClient()