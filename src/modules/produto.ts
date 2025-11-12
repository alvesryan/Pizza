// src/modules/produto.module.ts
import { askQuestion } from "../utils/cli";
import { produtos } from "../services/storage.service";
import { Produto } from "../types/models";

//CADASTRO DE PRODUTO
export async function cadastrodeProduto(): Promise<void> {
  console.clear();
  console.log("----------- CADASTRO DE PRODUTOS ------------");

  const nomeProduto = await askQuestion("Nome do produto: ");
  const precoProdutoStr = await askQuestion("Preço do produto: ");
  const precoProduto = parseFloat(precoProdutoStr);
  let produtoId: number;
  if (produtos.length > 0) {
    // se o array produto não estiver vazia,
    // pega o último produto que foi adicionado, e o Id do novo produto será o id do ultimo produto + 1
    const ultimoProduto = produtos[produtos.length - 1];
    produtoId = ultimoProduto.id + 1;
  } else {
    // se a array estiver vazia, então significa que é o primeiro produto, então ele terá o primeiro Id
    produtoId = 1;
  }

  const cadastroProduto: Produto = {
    // as informações da variável "cadastroProduto" serão levadas para o objeto produto.
    id: produtoId, //Id do produto
    nome: nomeProduto, //Nome do produto
    preco: precoProduto, // preco do produto
  };

  produtos.push(cadastroProduto); // aqui todas as informações que foram obtidas pela variável "cadastroProduto" serão transferidas para o array "Produto"
  console.log(`\nProduto '${cadastroProduto.nome}' cadastrado com sucesso!`); // e aqui a confirmação de que o produto foi cadastrado.
  await askQuestion("ENTER para continuar");
}

//BUSCADOR DE PRODUTOS

export async function buscarProdutos(): Promise<void> {
  console.clear();
  console.log("------------ BUSCADOR DE PRODUTOS -------------");

  if (produtos.length === 0) {
    console.log("Não há produtos cadastrados.");
  } else {
    for (let i = 0; i < produtos.length; i++) {
      // esse loop ira ter o mesmo papel do loop de buscar clientes, ele percorre todo o array(produtos) mostrando os produtos cadastrados.
      const produtoBuscado = produtos[i]; // a variável "produtoBuscado" ira receber o valor da array "produtos"
      console.log(
        `Id: ${produtoBuscado.id} | Nome: ${
          produtoBuscado.nome
        } | Preço: ${produtoBuscado.preco.toFixed(2)}`
      ); // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
    }
  }
  await askQuestion("ENTER para continuar:");
}