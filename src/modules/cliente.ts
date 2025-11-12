// src/modules/cliente.module.ts
import { askQuestion } from "../utils/cli";
import { clientes } from "../services/storage.service";
import { Cliente } from "../types/models";

//CADASTRO DE CLIENTE

export async function cadastrodeClientes(): Promise<void> {
  console.clear();
  console.log("-------- CADASTRO DE CLIENTES -------");

  const nomeCliente = await askQuestion("Nome do cliente: ");
  const contatoClienteStr = await askQuestion("Número de contato do cliente: ");
  const contatoCliente = parseInt(contatoClienteStr);
  let clienteId: number; // variável que irá guardar o Id do cliente.

  if (clientes.length > 0) {
    // se o array Cliente não estiver vazia,
    // pega o último cliente que foi adicionado, e o Id do novo cliente será o id do ultimo cliente + 1
    const ultimoCliente = clientes[clientes.length - 1];
    clienteId = ultimoCliente.id + 1;
  } else {
    // se a array estiver vazia, então significa que é o primeiro cliente, então ele terá o primeiro I
    clienteId = 1;
  }

  const cadastroCliente: Cliente = {
    // a variável "cadastroCliente" armazena os dados coletados no objeto "Cliente"
    id: clienteId, //Id do cliente
    nome: nomeCliente, // seu nome
    contato: contatoCliente, // e o telefone de contato
  };

  clientes.push(cadastroCliente); //".push" leva os dados da variável "cadastroCliente" para a lista "clientes"
  console.log(`\nCliente '${cadastroCliente.nome}' cadastrado com sucesso!`); // e aqui uma confirmação de cadastro, utilando o nome do cliente
  await askQuestion("ENTER para continuar");
}

// BUSCADOR DE CLIENTE

export async function buscarClientes(): Promise<void> {
  console.clear();
  console.log("------ BUSCAR CLIENTES ------");

  if (clientes.length === 0) {
    // se não houver clientes no array, o console abaixo é executado
    console.log("Não há clientes cadastrados até o momento!");
  } else {
    // se houver

    for (let i = 0; i < clientes.length; i++) {
      // esse loop ira percorrer todo o array(clientes) mostrando os clientes cadastrados.
      const clienteBuscado = clientes[i]; // a variável "clienteBuscado" ira receber o valor da array "clientes"
      console.log(
        `Id: ${clienteBuscado.id} | Nome: ${clienteBuscado.nome} | Contato: ${clienteBuscado.contato}`
      ); // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
    }
  }
  // Mudei o 'await' para fora do 'else' para pausar mesmo se a lista estiver vazia
  await askQuestion("ENTER para continuar:");
}