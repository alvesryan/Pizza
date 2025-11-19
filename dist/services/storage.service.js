"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarClientes = listarClientes;
exports.adicionarCliente = adicionarCliente;
exports.listarProdutos = listarProdutos;
exports.adicionarProduto = adicionarProduto;
exports.criarPedido = criarPedido;
exports.listarPedidos = listarPedidos;
// src/services/storage.service.ts
const database_1 = require("../database"); // Importamos nosso cliente do banco de dados
// --- FUNÇÕES DE CLIENTES ---
// Busca todos os clientes salvos no banco de dados
async function listarClientes() {
    // O método findMany traz todos os registros da tabela
    return await database_1.prisma.cliente.findMany();
}
// Salva um novo cliente direto no banco
async function adicionarCliente(nome, contato) {
    // O método create cria uma nova linha na tabela
    const novoCliente = await database_1.prisma.cliente.create({
        data: {
            nome: nome,
            contato: contato.toString(), // garantindo que seja salvo como texto
        },
    });
    return novoCliente;
}
// --- FUNÇÕES DE PRODUTOS ---
// Busca todos os produtos disponíveis
async function listarProdutos() {
    return await database_1.prisma.produto.findMany();
}
// Adiciona um novo produto ao cardápio no banco
async function adicionarProduto(nome, preco) {
    const novoProduto = await database_1.prisma.produto.create({
        data: {
            nome: nome,
            preco: preco,
        },
    });
    return novoProduto;
}
// --- FUNÇÕES DE PEDIDOS ---
// Salva um pedido completo (com os itens!) no banco de dados
async function criarPedido(clienteId, itens, total, formaPagamento) {
    // Aqui acontece a mágica do Prisma: criamos o Pedido E os Itens ao mesmo tempo
    const novoPedido = await database_1.prisma.pedido.create({
        data: {
            clienteId: clienteId, // Conecta com o cliente existente
            total: total,
            formaPagamento: formaPagamento,
            dataCriacao: new Date(), // Data atual
            // Aqui criamos os itens relacionados a esse pedido
            itens: {
                create: itens.map((item) => ({
                    quantidade: item.quantidade,
                    produtoId: item.produtoId, // Conecta com o produto existente
                })),
            },
        },
        // O include serve para retornar o pedido JÁ com os dados do cliente e dos itens preenchidos
        include: {
            cliente: true,
            itens: {
                include: {
                    produto: true,
                },
            },
        },
    });
    return novoPedido;
}
// Lista todos os pedidos já feitos, trazendo junto os nomes dos clientes e produtos
async function listarPedidos() {
    return await database_1.prisma.pedido.findMany({
        include: {
            cliente: true, // Traz os dados do cliente dono do pedido
            itens: {
                include: {
                    produto: true, // Traz os dados do produto de cada item
                },
            },
        },
    });
}
