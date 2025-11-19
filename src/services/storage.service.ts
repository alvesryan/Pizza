// src/services/storage.service.ts
import { prisma } from "../database"; // Importamos nosso cliente do banco de dados
import { Cliente, Produto, Pedido, ItemPedido } from "../types/models";

// --- FUNÇÕES DE CLIENTES ---

// Busca todos os clientes salvos no banco de dados
export async function listarClientes() {
  // O método findMany traz todos os registros da tabela
  return await prisma.cliente.findMany();
}

// Salva um novo cliente direto no banco
export async function adicionarCliente(nome: string, contato: string) {
  // O método create cria uma nova linha na tabela
  const novoCliente = await prisma.cliente.create({
    data: {
      nome: nome,
      contato: contato.toString(), // garantindo que seja salvo como texto
    },
  });
  return novoCliente;
}

// --- FUNÇÕES DE PRODUTOS ---

// Busca todos os produtos disponíveis
export async function listarProdutos() {
  return await prisma.produto.findMany();
}

// Adiciona um novo produto ao cardápio no banco
export async function adicionarProduto(nome: string, preco: number) {
  const novoProduto = await prisma.produto.create({
    data: {
      nome: nome,
      preco: preco,
    },
  });
  return novoProduto;
}

// --- FUNÇÕES DE PEDIDOS ---

// Salva um pedido completo (com os itens!) no banco de dados
export async function criarPedido(
  clienteId: number,
  itens: { produtoId: number; quantidade: number }[],
  total: number,
  formaPagamento: string
) {
  // Aqui acontece a mágica do Prisma: criamos o Pedido E os Itens ao mesmo tempo
  const novoPedido = await prisma.pedido.create({
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
export async function listarPedidos() {
  return await prisma.pedido.findMany({
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