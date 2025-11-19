"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// src/database.ts
const client_1 = require("@prisma/client");
// Cria a conexão com o banco
exports.prisma = new client_1.PrismaClient();
