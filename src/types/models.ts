// src/types/models.ts

export interface Cliente {
  //Objetp Cliente
  id: number; // esse é o id que vai ser direcionado ao cliente.
  nome: string; //  essa variavel vai armazenar os nomes dos clientes.
  contato: string; // e essa registrar seu número de contato.
}
export interface Produto {
  //Objeto Produto
  id: number; //regustro do Id do produto.
  nome: string; // aqui é feito o registro de nome do produto.
  preco: number; // e aqui seu preço
}
export interface ItemPedido {
  // Objeto dos itens dos pedidos
  produto: Produto; // aqui qual o produto foi adicionado.
  quantidade: number; // e aqui a quantidade do produto para o pedido
}
export interface Pedido {
  // Objeto de realização do pedido.
  id: number; // o id do pedido
  cliente: Cliente; // o nome do cliente, que ja vai estar cadastrado
  itens: ItemPedido[]; //os itens do pedido, que também ja vão estar cadastrados
  total: number; // e o total a pagar do pedido
  formaPagamento: string; // varivel que vai guardar a forma de pagamento do cliente
  dataCriacao: Date; // e a data de criação do pedido
}