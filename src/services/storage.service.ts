// src/services/storage.service.ts
import { prisma } from "../database";

// --- CLIENTES ---

export async function listarClientes() {
  return await prisma.cliente.findMany({
    orderBy: { id: 'desc' } // Mostra os mais novos primeiro
  });
}

export async function adicionarCliente(nome: string, contato: string) {
  const novoCliente = await prisma.cliente.create({
    data: {
      nome: nome,
      contato: contato,
    },
  });
  return novoCliente;
}

// --- PRODUTOS ---

export async function listarProdutos() {
  return await prisma.produto.findMany({
    orderBy: { id: 'asc' }
  });
}

export async function adicionarProduto(nome: string, preco: number) {
  const novoProduto = await prisma.produto.create({
    data: {
      nome: nome,
      preco: preco,
    },
  });
  return novoProduto;
}

// --- PEDIDOS ---

export async function listarPedidos() {
  return await prisma.pedido.findMany({
    include: {
      cliente: true, // Traz os dados do cliente
      itens: {
        include: {
          produto: true, // Traz o nome do produto em cada item
        },
      },
    },
    orderBy: { dataCriacao: 'desc' } // Pedidos recentes no topo
  });
}

export async function criarPedido(
  clienteId: number,
  itens: { produtoId: number; quantidade: number }[],
  total: number,
  formaPagamento: string
) {
  const novoPedido = await prisma.pedido.create({
    data: {
      clienteId: clienteId,
      total: total,
      formaPagamento: formaPagamento,
      // A mágica do Prisma: Cria os itens e vincula ao pedido de uma vez só
      itens: {
        create: itens.map((item) => ({
          quantidade: item.quantidade,
          produtoId: item.produtoId,
        })),
      },
    },
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