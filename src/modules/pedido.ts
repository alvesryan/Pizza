// src/modules/pedido.ts
import { askQuestion } from "../utils/cli";
// Importamos as funções do banco de dados em vez dos arrays
import { listarClientes, listarProdutos, criarPedido } from "../services/storage.service";
import { Cliente, Produto, ItemPedido } from "../types/models";
import * as fs from "fs";
import * as path from "path";

//-Pedido

export async function realizarPedido(): Promise<void> {
  // Buscamos os dados reais do Banco de Dados antes de começar
  const todosClientes = await listarClientes();
  const todosProdutos = await listarProdutos();

  let itensPedidos: ItemPedido[] = [];

  // Verifica se as listas do banco estão vazias
  if (todosClientes.length === 0 || todosProdutos.length === 0) {
    console.log(
      "ERRO: É necessário ter ao menos um cliente e um produto cadastrado no banco!"
    );
    await askQuestion("ENTER para continuar...");
    return;
  }
  console.log("------------------- NOVO PEDIDO --------------------");
  
  if (todosClientes.length === 0) {
    console.log("Não há clientes cadastrados até o momento!");
  } else {
    // Percorremos a lista que veio do banco
    for (let i = 0; i < todosClientes.length; i++) {
      const clienteBuscado = todosClientes[i];
      console.log(
        `Id: ${clienteBuscado.id} | Nome: ${clienteBuscado.nome} | Contato: ${clienteBuscado.contato}`
      );
    }
  }
  const idClienteStr = await askQuestion("Digite o Id do cliente: ");
  const idCliente = parseInt(idClienteStr); //inicio da busca do cliente.

  let clienteEncontrado: Cliente | undefined = undefined; // Crio uma "caixa" vazia para o cliente // o for abaixo percorre a lista "clientes" de uma ponta a outra, ou até encontar o valor do id do cliente solicitado

  for (let i = 0; i < todosClientes.length; i++) {
    // se o Id do cliente solicitado for encontrado ele será colocado na variável
    if (todosClientes[i].id === idCliente) {
      clienteEncontrado = todosClientes[i];
      break; // o loop para pois o valor ja foi encontrado
    }
  }
  if (!clienteEncontrado) {
    // caso o cliente não exista, o console abaixo aparecera.
    console.log("Cliente com este ID não foi encontrado!");
    await askQuestion("ENTER para continuar...");
    return; //  aqui é a função é parada
  } // varivel feita para controlar a duração do looping, enquanto seu valor for true, o looping será executado
  
  let adicionandoItens = true;
  while (adicionandoItens) {
    // enquanto "adicionarItens" for true , todo o bloco será executado.
    console.clear();
    console.log(`CLIENTE: ${clienteEncontrado.nome}`); // clienteEncontrado.nome = o nome do cliente encontrado no laço for logo acima, que está dentro da lista "Cliente", será mostrado na tela.
    
    // Percorre a lista de produtos do banco
    for (let i = 0; i < todosProdutos.length; i++) {
      // A cada volta do loop, eu pego o produto que está na posição 'i'
      const produtoDisponivel = todosProdutos[i]; // E mostro as informações desse produto específico
      console.log(
        `${produtoDisponivel.id} - ${
          produtoDisponivel.nome
        } (R$ ${produtoDisponivel.preco.toFixed(2)})`
      );
    }
    const idProdutoStr = await askQuestion("Digite o Id do produto: ");
    const idProduto = parseInt(idProdutoStr); //aqui começa a busca pelo produto

    let produtoEncontrado: Produto | undefined = undefined; // mais uma vez com a criação de uma variável vazia.

    for (let i = 0; i < todosProdutos.length; i++) {
      //aqui o .lenth percorre toda a lista em busca do Id digitado.
      if (todosProdutos[i].id === idProduto) {
        // quando esse Id é encontrado, ele é adicionadoo na variável produtoEncontrado.
        produtoEncontrado = todosProdutos[i];
        break;
      }
    }
    if (!produtoEncontrado) {
      // caso o Id não seja encontrado, o bloco abaixo será executado.
      console.log("Produto com este ID não foi encontrado!");
      await askQuestion("ENTER para continuar...");
      continue; // Pula para a próxima volta do loop
    }
    const quantidadeStr = await askQuestion(
      `Quantidade de '${produtoEncontrado.nome}': `
    );
    const quantidade = parseInt(quantidadeStr);

    if (quantidade <= 0 || isNaN(quantidade)) {
      // caso o valor digitado seja 0, letras, ou n seja digitado nada, o bloco abaixo será executado.
      console.log("Quantidade inválida. Adicione ao menos 1 item.");
      await askQuestion("ENTER para continuar...");
      continue; // pula pra proxima volta do loop
    }
    itensPedidos.push({ produto: produtoEncontrado, quantidade: quantidade }); // o .push vai trazer os dados coletado das variáveis "produtoEncontrado" e "quantidade" e armazenalos no array "itensPedido"
    const respostaUsuario = await askQuestion(
      "Deseja adicionar outro produto? (s/n): "
    ); // a resposta do usuário é armazenada na constante "respostaUsuario" // Se a resposta do usuário não for 's', a variável de controle vira 'false' // e o loop 'while' irá parar na próxima verificação.
    if (respostaUsuario.toLowerCase() !== "s") {
      //se a resposta do usuário for diferente de s, então o looping será finalizado
      // .toLowerCase() é um método de formatação, onde tudo que o usuário digitar será convertido em letras minúsculas.
      adicionandoItens = false;
    }
  }

  console.log("\n--- Finalizando Pedido ---"); // variável de valor total do pedido, tem valor 0 pois o programa ainda não foi iniado.

  let totalDoPedido = 0; //percorro toda a variável "itensPedidos" e adiciono seus valores na variável itemAtual
  for (let i = 0; i < itensPedidos.length; i++) {
    const itemAtual = itensPedidos[i];
    const subtotalItem = itemAtual.produto.preco * itemAtual.quantidade; //subtotalItem recebe o itemAtual.produto.preco e é multiplicado a quantidade do item atual
    totalDoPedido = totalDoPedido + subtotalItem; //"totalDoPedido" vai receber seu valor mais o "subtotalItem"
    console.log(
      `- ${itemAtual.produto.nome} (x${
        itemAtual.quantidade
      }): R$ ${subtotalItem.toFixed(2)}`
    ); // e aqui tudo é empresso na tela.
  } //Essa parte do código é onde o cliente vai escolher sua forma de pagamento.
  console.log("----------Forma de Pagamento-------------");
  console.log("1 - Pix.");
  console.log("2 - Dinheiro");
  console.log("3 - Débito");
  console.log("4 - Crédito");
  let metodoPagamento = ""; // declaro uma variável vazia para que o valor que ela ira receber, possa ser adicionado depois no switch.
  while (metodoPagamento === "") {
    const escolhaPagamento = await askQuestion(
      "Digite qual será a forma de pagamento (1-4): "
    );
    switch (escolhaPagamento) {
      case "1":
        metodoPagamento = "Pix";
        break;
      case "2":
        metodoPagamento = "Dinheiro";
        break;
      case "3":
        metodoPagamento = "Débito";
        break;
      case "4":
        metodoPagamento = "Crédito";
        break;
      default:
        console.log("Digite uma opção válida!"); // e o loop continua, por que a variável "metodoPagamento" não teve seu valor altearado.
        break;
    }
  }
  
  // Lógica de ID Removida: O Banco de Dados gera o ID automaticamente agora.

  // Precisamos formatar os itens para o formato que o banco espera (apenas ID e quantidade)
  const itensParaBanco = itensPedidos.map(item => ({
    produtoId: item.produto.id,
    quantidade: item.quantidade
  }));

  // SALVANDO NO BANCO DE DADOS
  // Aqui chamamos a função do storage.service que criamos antes
  const pedidoSalvo = await criarPedido(
      clienteEncontrado.id, 
      itensParaBanco, 
      totalDoPedido, 
      metodoPagamento
  );

  // Nota Fiscal.
// --- 1. Monta o conteúdo da Nota Fiscal ---
// Usamos 'pedidoSalvo' que retornou do banco, pois ele tem o ID oficial gerado
  const conteudoNota = `
---------------------------------
        PIZZARIA - NOTA FISCAL
---------------------------------

NÚMERO DO PEDIDO: ${pedidoSalvo.id}
CLIENTE: ${pedidoSalvo.cliente.nome}

ITENS:
${itensPedidos // Aqui uso 'itensPedidos' pq já tenho os nomes carregados na memória
  .map(
    (item) =>
      `  - ${item.produto.nome} (x${item.quantidade}): R$ ${(
        item.produto.preco * item.quantidade
      ).toFixed(2)}`
  )
  .join("\n")}

---------------------------------
TOTAL DO PEDIDO: R$ ${pedidoSalvo.total.toFixed(2)}
FORMA DE PAGAMENTO: ${pedidoSalvo.formaPagamento}
---------------------------------
  `;

  // --- 2. Define o caminho e cria a pasta "notas_fiscais" ---
  // __dirname aponta para 'dist/modules', subimos dois níveis para a raiz do projeto
  const NOTAS_DIR = path.resolve(__dirname, "..", "..", "notas_fiscais");
  
  if (!fs.existsSync(NOTAS_DIR)) {
    fs.mkdirSync(NOTAS_DIR, { recursive: true });
  }

  // --- 3. Define o nome do arquivo e salva ---
  const nomeArquivo = `pedido_${pedidoSalvo.id}.txt`;
  const caminhoArquivo = path.join(NOTAS_DIR, nomeArquivo);

  try {
    // Salva o arquivo de forma síncrona
    fs.writeFileSync(caminhoArquivo, conteudoNota.trim());

    // --- 4. Exibe a nota no console (como antes) e informa sobre o .txt ---
    console.log("---------------------------------");
    console.log(`NÚMERO DO PEDIDO: ${pedidoSalvo.id}`);
    console.log(`TOTAL DO PEDIDO: R$ ${pedidoSalvo.total.toFixed(2)}`); //toFixed(2) faz com que o preço tenha fixadamente 2 casas decimais.
    console.log(`FORMA DE PAGAMENTO: ${pedidoSalvo.formaPagamento}`);
    console.log("\nPedido realizado com sucesso!");
    console.log(`\nNota fiscal em TXT salva em: ${caminhoArquivo}`);
  
  } catch (error) { 
    console.log("\nPedido realizado com sucesso!");
    
    // Verificamos se 'error' é um objeto de Erro antes de usar 'error.message'
    if (error instanceof Error) {
      console.log(`ERRO AO SALVAR ARQUIVO TXT: ${error.message}`);
    } else {
      console.log(`ERRO AO SALVAR ARQUIVO TXT: Ocorreu um erro desconhecido.`);
    }
  }

  await askQuestion("ENTER para voltar ao menu...");
}