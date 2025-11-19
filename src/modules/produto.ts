import { askQuestion } from "../utils/cli";
import { adicionarProduto, listarProdutos } from "../services/storage.service";
import { Produto } from "../types/models";

//CADASTRO DE PRODUTO
export async function cadastrodeProduto(): Promise<void> {
  console.clear();
  console.log("----------- CADASTRO DE PRODUTOS ------------");

  const nomeProduto = await askQuestion("Nome do produto: ");
  const precoProdutoStr = await askQuestion("Preço do produto: ");
  const precoProduto = parseFloat(precoProdutoStr);
  
  // Chamamos a função que salva no banco e recebemos o produto criado de volta
  const produtoSalvo = await adicionarProduto(nomeProduto, precoProduto);

  // Exibe a confirmação usando o nome que voltou do banco
  console.log(`\nProduto '${produtoSalvo.nome}' cadastrado com sucesso!`); 
  console.log(`ID gerado: ${produtoSalvo.id}`);
  
  await askQuestion("ENTER para continuar");
}

//BUSCADOR DE PRODUTOS

export async function buscarProdutos(): Promise<void> {
  console.clear();
  console.log("------------ BUSCADOR DE PRODUTOS -------------");

  // Buscamos a lista atualizada direto do banco de dados
  const listaProdutos = await listarProdutos();

  if (listaProdutos.length === 0) {
    console.log("Não há produtos cadastrados.");
  } else {
    for (let i = 0; i < listaProdutos.length; i++) {
      // esse loop ira ter o mesmo papel do loop de buscar clientes, ele percorre todo o array (que veio do banco) mostrando os produtos cadastrados.
      const produtoBuscado = listaProdutos[i]; // a variável "produtoBuscado" ira receber o valor da array
      console.log(
        `Id: ${produtoBuscado.id} | Nome: ${
          produtoBuscado.nome
        } | Preço: ${produtoBuscado.preco.toFixed(2)}`
      ); // aqui temos a exibição das informaçoes de todos os produtos cadastrados.
    }
  }
  await askQuestion("ENTER para continuar:");
}