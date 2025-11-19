// src/modules/cliente.module.ts
import { askQuestion } from "../utils/cli";
// Importamos as funções do banco em vez do array 'clientes'
import { adicionarCliente, listarClientes } from "../services/storage.service";
import { Cliente } from "../types/models";

//CADASTRO DE CLIENTE

export async function cadastrodeClientes(): Promise<void> {
  console.clear();
  console.log("-------- CADASTRO DE CLIENTES -------");

  const nomeCliente = await askQuestion("Nome do cliente: ");
  const contatoClienteStr = await askQuestion("Número de contato do cliente: ");
  
  // Nota: Mudei para string para aceitar DDD e traços, e porque o banco espera String.
  // Se quiser apenas números, pode converter, mas no banco salvamos como texto.
  const contatoCliente = contatoClienteStr; 

  // A lógica de ID manual (if/else) não é mais necessária!
  // O Banco de Dados (PostgreSQL) gera o ID automaticamente (autoincrement)
  
  // a variável "cadastroCliente" agora vem direto do banco após salvar
  const clienteSalvo = await adicionarCliente(nomeCliente, contatoCliente);

  // ".push" não é mais usado. O "adicionarCliente" já salvou no banco.
  
  console.log(`\nCliente '${clienteSalvo.nome}' cadastrado com sucesso!`); // e aqui uma confirmação de cadastro, utilando o nome do cliente
  console.log(`ID gerado pelo banco: ${clienteSalvo.id}`);
  
  await askQuestion("ENTER para continuar");
}

// BUSCADOR DE CLIENTE

export async function buscarClientes(): Promise<void> {
  console.clear();
  console.log("------ BUSCAR CLIENTES ------");

  // Primeiro buscamos a lista atualizada do banco de dados
  const listaDeClientes = await listarClientes();

  if (listaDeClientes.length === 0) {
    // se não houver clientes no array (banco), o console abaixo é executado
    console.log("Não há clientes cadastrados até o momento!");
  } else {
    // se houver

    for (let i = 0; i < listaDeClientes.length; i++) {
      // esse loop ira percorrer todo o array(listaDeClientes) mostrando os clientes cadastrados.
      const clienteBuscado = listaDeClientes[i]; // a variável "clienteBuscado" ira receber o valor da array
      console.log(
        `Id: ${clienteBuscado.id} | Nome: ${clienteBuscado.nome} | Contato: ${clienteBuscado.contato}`
      ); // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
    }
  }
  // Mudei o 'await' para fora do 'else' para pausar mesmo se a lista estiver vazia
  await askQuestion("ENTER para continuar:");
}