import * as readline from "readline"; // Essa linha permite que o usuário interaja com o programa. podendo digitar na tela.
import * as fs from "fs"; // essa linha é responsável por ler, escrever e criar pasts.
import * as path from "path"; // essa linha ajuda no trabalho com o caminho dos arquivos.

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

let clientes: Cliente[] = []; // Array para armazenar clientes
let produtos: Produto[] = []; // Array para armazenar produtos
let pedidos: Pedido[] = []; // Array para armazenar os pedidos
//Esse blodo de código é o responsavel pelo armazenamento dos dadosd.

// definição dos caminhos dos arquivos csv.
const DATA_DIR = path.resolve(__dirname, "..", "data"); //código de organização das pastas.
const CLIENTES_CSV = path.join(DATA_DIR, "clientes.csv");
const PRODUTOS_CSV = path.join(DATA_DIR, "produtos.csv");
const PEDIDOS_CSV = path.join(DATA_DIR, "pedidos.csv");
const ITENS_PEDIDO_CSV = path.join(DATA_DIR, "itens_pedido.csv");

// Salva todos os dados dos arrays em memória para os arquivos CSV.

function salvarDados(): void {
  //um if else, pra saber se o diretório existe.
  if (!fs.existsSync(DATA_DIR)) {
    // se o diretório "DATA_DIR" não existir
    fs.mkdirSync(DATA_DIR); // ele será criado
  } // 1. Salvar Clientes

  const cabecalhoArquivoDoCliente = "id,nome,contato\n"; // Essa são as informações que o arquivo csv vai guardar dos clientes.
  const corpoArquivoCliente = clientes
    .map((cliente) => `${cliente.id},${cliente.nome},${cliente.contato}`)
    .join("\n"); // as informações irão ficar dessa forma no arquivo: id, nome, contato, e no final a linha sera quebrada.
  fs.writeFileSync(
    CLIENTES_CSV,
    cabecalhoArquivoDoCliente + corpoArquivoCliente
  ); // 2. Salvar Produtos
  // Nessa linha de código, o arquivo csv, vai receber as informações do cabeçalho e do corpo do arquivo.

  const cabecalhoArquivoDoProduto = "id,nome,preco\n";
  const corpoArquivoProdutos = produtos
    .map((produtos) => `${produtos.id},${produtos.nome},${produtos.preco}`)
    .join("\n");
  fs.writeFileSync(
    PRODUTOS_CSV,
    cabecalhoArquivoDoProduto + corpoArquivoProdutos
  ); // 3. Salvar Pedidos (com referência ao ID do cliente)
  // Esse bloco de código funciona da mesma maneira que o anterior

  const cabecalhoPedido = "id,cliente_id,total,formaPagamento\n";
  const corpoPedido = pedidos
    .map(
      (pedidos) =>
        `${pedidos.id},${pedidos.cliente.id},${pedidos.total},${pedidos.formaPagamento}`
    )
    .join("\n");
  fs.writeFileSync(PEDIDOS_CSV, cabecalhoPedido + corpoPedido); // 4. Salvar Itens do Pedido (relacionando pedido e produto)

  const cabecalhoItens = "pedido_id,produto_id,quantidade\n";
  const corpoItens: string[] = [];
  pedidos.forEach((pedido) => {
    //aqui um laço que vai percorrer todo o array "pedidos"
    pedido.itens.forEach((item) => {
      // e pra cada elemento encontrado
      corpoItens.push(`${pedido.id},${item.produto.id},${item.quantidade}`); //este bloco é executado
    });
  });
  fs.writeFileSync(ITENS_PEDIDO_CSV, cabecalhoItens + corpoItens.join("\n")); // no final, o csv vai conter as informações deste bloco
}

// Esta função carrega todos os dados dos arquivos CSV para os arrays em memória (clientes, produtos, pedidos).
function carregarDados(): void {
  console.log("Carregando dados dos arquivos CSV..."); // O Programa verifica se o arquivo de cliente existe antes de tentar executar ele.
  if (fs.existsSync(CLIENTES_CSV)) {
    const data = fs.readFileSync(CLIENTES_CSV, "utf-8"); // Lê todo o conteúdo do arquivo CSV como um único texto.
    const lines = data.split("\n").slice(1); // Quebra o texto em um array de linhas, usando a quebra de linha ('\n') como separador. // .slice(1) remove o primeiro item do array (a linha do cabeçalho 'id,nome,contato'). // Agora, processamos cada linha para transformá-la de volta em um objeto Cliente.
    clientes = lines
      .filter((line) => line) // .filter(line => line) remove qualquer linha em branco que possa existir no final do arquivo.
      .map((line) => {
        // .map() transforma cada item do array. Neste caso, cada 'linha' de texto vira um 'objeto'.
        // Quebra a linha '1,Ana Silva,119...' em um array ['1', 'Ana Silva', '119...'] usando a vírgula.
        const [id, nome, contato] = line.split(","); // Transforma a linha '1,Ana Silva,119' em um array ['1', 'Ana Silva', '119'] usando a vírgula.
        return { id: parseInt(id), nome, contato: parseInt(contato) }; // Retorna o objeto Cliente formatado, convertendo os IDs e contatos de texto para número.
      });
  } // O processo para carregar produtos é idêntico ao de clientes.

  if (fs.existsSync(PRODUTOS_CSV)) {
    const data = fs.readFileSync(PRODUTOS_CSV, "utf-8");
    const lines = data.split("\n").slice(1);
    produtos = lines
      .filter((line) => line)
      .map((line) => {
        const [id, nome, preco] = line.split(","); // A única diferença é usar parseFloat para o preço, pois ele pode ter casas decimais.
        return { id: parseInt(id), nome, preco: parseFloat(preco) };
      });
  } // --- Etapa 3: Reconstruir o Quebra-Cabeça (Pedidos e Itens) --- // checagem pra ver se os arquivos exitem

  if (fs.existsSync(PEDIDOS_CSV) && fs.existsSync(ITENS_PEDIDO_CSV)) {
    //checa se os arquivos existem
    // 3a. Primeiro, carregamos TODOS os itens de TODOS os pedidos para um array temporário.
    const itensData = fs.readFileSync(ITENS_PEDIDO_CSV, "utf-8"); // o arquivo está sendo lido pelo método.
    const todosItens = itensData
      .split("\n")
      .slice(1)
      .filter((line) => line)
      .map((line) => {
        // .split(divide o texto em uma array, cada elemento se torna uma linha)
        //.slice(remove a primeira linha(cabeçalho))
        //.filter(remove linhas em branco)
        //.map(transforma cada linha do texto, em um objeto)
        const [pedido_id, produto_id, quantidade] = line.split(",");
        return {
          pedido_id: parseInt(pedido_id),
          produto_id: parseInt(produto_id),
          quantidade: parseInt(quantidade),
        };
      }); // 3b. Agora, carregamos os pedidos e usamos os dados que já temos para remontá-los.

    const pedidosData = fs.readFileSync(PEDIDOS_CSV, "utf-8"); // lê o arquivo.
    pedidos = pedidosData
      .split("\n")
      .slice(1)
      .filter((line) => line)
      .map((line) => {
        const [id, cliente_id, total, formaPagamento] = line.split(","); // essas serão as informações que aparecerão no arquivo de pedidos // --- INÍCIO DA RECONSTRUÇÃO --- // Para cada linha de pedido, usamos o 'cliente_id' para encontrar o OBJETO Cliente completo no array 'clientes'.
        const clienteDoPedido = clientes.find(
          (cliente) => cliente.id === parseInt(cliente_id)
        );
        if (!clienteDoPedido) return null; // se o cliente não for encontrado (foi deletado), pulamos este pedido para evitar erro. // Agora, para o pedido atual, filtramos a lista pegando apenas os itens cujo pedido_id é igual ao id do pedido atual.

        const itensDestePedido = todosItens
          .filter((item) => item.pedido_id === parseInt(id)) // Com a lista de itens correta, fazemos um '.map()' para transformar cada item.
          .map((itemInfo) => {
            // Para cada item, usamos o 'produto_id' para encontrar o OBJETO Produto completo no array 'produtos'.
            const produtoDoItem = produtos.find(
              (p) => p.id === itemInfo.produto_id
            ); // Medida de segurança: se o produto não for encontrado, pulamos este item.
            if (!produtoDoItem) return null; // Retornamos o objeto no formato correto de 'ItemPedido', com o objeto Produto inteiro.
            return { produto: produtoDoItem, quantidade: itemInfo.quantidade };
          }) // No final, filtramos novamente para remover quaisquer itens que possam ter se tornado 'null'.
          .filter((item): item is ItemPedido => item !== null); // Finalmente, retornamos o objeto Pedido completo, com todas as suas referências restauradas.

        return {
          id: parseInt(id),
          cliente: clienteDoPedido, // Aqui entra o objeto Cliente completo.
          total: parseFloat(total),
          formaPagamento,
          itens: itensDestePedido, // E aqui entra o array de objetos ItemPedido completos.
        }; // No final, filtramos uma última vez para remover quaisquer pedidos que possam ter se tornado 'null'.
      })
      .filter((pedido): pedido is Pedido => pedido !== null);
  }
  console.log("Dados carregados. Sistema pronto.");
}

interface Cliente {
  //Objetp Cliente
  id: number; // esse é o id que vai ser direcionado ao cliente.
  nome: string; //  essa variavel vai armazenar os nomes dos clientes.
  contato: number; // e essa registrar seu número de contato.
}
interface Produto {
  //Objeto Produto
  id: number; //regustro do Id do produto.
  nome: string; // aqui é feito o registro de nome do produto.
  preco: number; // e aqui seu preço
}
interface ItemPedido {
  // Objeto dos itens dos pedidos
  produto: Produto; // aqui qual o produto foi adicionado.
  quantidade: number; // e aqui a quantidade do produto para o pedido
}
interface Pedido {
  // Objeto de realização do pedido.
  id: number; // o id do pedido
  cliente: Cliente; // o nome do cliente, que ja vai estar cadastrado
  itens: ItemPedido[]; //os itens do pedido, que também ja vão estar cadastrados
  total: number; // e o total a pagar do pedido
  formaPagamento: string; // varivel que vai guardar a forma de pagamento do cliente
}

//CADASTRO DE CLIENTE

async function cadastrodeClientes(): Promise<void> {
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

async function buscarClientes(): Promise<void> {
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
    await askQuestion("ENTER para continuar:");
  }
}

//CADASTRO DE PRODUTO
async function cadastrodeProduto(): Promise<void> {
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

async function buscarProdutos(): Promise<void> {
  console.clear();
  console.log("------------ BUSCADOR DE PRODUTOS -------------");

  for (let i = 0; i < produtos.length; i++) {
    // esse loop ira ter o mesmo papel do loop de buscar clientes, ele percorre todo o array(produtos) mostrando os produtos cadastrados.
    const produtoBuscado = produtos[i]; // a variável "produtoBuscado" ira receber o valor da array "produtos"
    console.log(
      `Id: ${produtoBuscado.id} | Nome: ${
        produtoBuscado.nome
      } | Preço: ${produtoBuscado.preco.toFixed(2)}`
    ); // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
  }
  await askQuestion("ENTER para continuar:");
}

//-Pedido

async function realizarPedido(): Promise<void> {
  let itensPedidos: ItemPedido[] = [];

  if (clientes.length === 0 || produtos.length === 0) {
    console.log(
      "ERRO: É necessário ter ao menos um cliente e um produto cadastrado!"
    );
    await askQuestion("ENTER para continuar...");
    return;
  }
  console.log("------------------- NOVO PEDIDO --------------------");
  if (clientes.length === 0) {
    console.log("Não há clientes cadastrados até o momento!");
  } else {
    for (let i = 0; i < clientes.length; i++) {
      const clienteBuscado = clientes[i];
      console.log(
        `Id: ${clienteBuscado.id} | Nome: ${clienteBuscado.nome} | Contato: ${clienteBuscado.contato}`
      );
    }
  }
  const idClienteStr = await askQuestion("Digite o Id do cliente: ");
  const idCliente = parseInt(idClienteStr); //inicio da busca do cliente.

  let clienteEncontrado: Cliente | undefined = undefined; // Crio uma "caixa" vazia para o cliente // o for abaixo percorre a lista "clientes" de uma ponta a outra, ou até encontar o valor do id do cliente solicitado

  for (let i = 0; i < clientes.length; i++) {
    // se o Id do cliente solicitado for encontrado ele será colocado na variável
    if (clientes[i].id === idCliente) {
      clienteEncontrado = clientes[i];
      break; // o loop para pois o valor ja foi encontrado
    }
  }
  if (!clienteEncontrado) {
    // caso o cliente não exista, o console abaixo aparecera.
    console.log("Cliente com este ID não foi encontrado!");
    await askQuestion("ENTER para continuar...");
    return; //  aqui é a função é parada
  } // varivel feita para controlar a duração do looping, enquanto seu valor for true, o looping será executado
  let adicionandoItens = true;
  while (adicionandoItens) {
    // enquanto "adicionarItens" for true , todo o bloco será executado.
    console.clear();
    console.log(`CLIENTE: ${clienteEncontrado.nome}`); // clienteEncontrado.nome = o nome do cliente encontrado no laço for logo acima, que está dentro da lista "Cliente", será mostrado na tela.
    for (let i = 0; i < produtos.length; i++) {
      // A cada volta do loop, eu pego o produto que está na posição 'i'
      const produtoDisponivel = produtos[i]; // E mostro as informações desse produto específico
      console.log(
        `${produtoDisponivel.id} - ${
          produtoDisponivel.nome
        } (R$ ${produtoDisponivel.preco.toFixed(2)})`
      );
    }
    const idProdutoStr = await askQuestion("Digite o Id do produto: ");
    const idProduto = parseInt(idProdutoStr); //aqui começa a busca pelo produto

    let produtoEncontrado: Produto | undefined = undefined; // mais uma vez com a criação de uma variável vazia.

    for (let i = 0; i < produtos.length; i++) {
      //aqui o .lenth percorre toda a lista em busca do Id digitado.
      if (produtos[i].id === idProduto) {
        // quando esse Id é encontrado, ele é adicionadoo na variável produtoEncontrado.
        produtoEncontrado = produtos[i];
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
  const pedido: Pedido = {
    id: pedidos.length + 1, // o pedido ganha um novo ID, que é o igual ao ultimo Id + 1
    cliente: clienteEncontrado, // nome do cliente que fez o pedido
    itens: itensPedidos, // todos os itens do pedido
    total: totalDoPedido, // e o valor total
    formaPagamento: metodoPagamento, // e a forma de pagamento
  };
  pedidos.push(pedido); // como nos outros .push, a variável pedido, leva seu valor para o array Pedido[]
  //Nota Fiscal.
  console.log("---------------------------------");
  console.log(`NÚMERO DO PEDIDO: ${pedido.id}`);
  console.log(`TOTAL DO PEDIDO: R$ ${pedido.total.toFixed(2)}`); //toFixed(2) faz com que o preço tenha fixadamente 2 casas decimais.
  console.log(`FORMA DE PAGAMENTO: ${pedido.formaPagamento}`);
  console.log("\nPedido realizado com sucesso!");
  await askQuestion("ENTER para voltar ao menu...");
}

//-MENU PRINCIPAL-

async function menu(): Promise<void> {
  let sair = false;

  while (!sair) {
    // enquando sair NÂO for false, o while é executado

    console.clear();
    console.log("===== PIZZARIA  ====="); // e nesse while, é onde o usuário vai fazer todos os cadastros, as buscas, e pedido dos clientes
    console.log("1. Cadastrar cliente"); // basta ele digitar o número que representa o que ele quer fazer dentro do sistema.
    console.log("2. Buscar clientes");
    console.log("3. Cadastrar produto");
    console.log("4. Buscar produtos");
    console.log("5. Realizar um pedido");
    console.log("6. Sair");
    console.log("======================================");

    const escolha = await askQuestion(
      "Digite o número referente ao seu desejo: "
    );

    switch (escolha) {
      case "1":
        await cadastrodeClientes();
        break; // quando o valor digitado no prompt acima pertencer a algum case, o respectivo case...
      case "2":
        await buscarClientes(); // chamará a função que está linkada nele
        break;
      case "3":
        await cadastrodeProduto();
        break;
      case "4":
        await buscarProdutos();
        break;
      case "5":
        await realizarPedido();
        break;
      case "6":
        salvarDados(); // quando o usuário quiser sair, todos os dados serão salvos.
        console.log("Até logo!!");
        sair = true; // sair vira true e o programa é finalizado.
        break;
      default: // caso o usuário não digite nenhum valor existente no case, a mensagem abaixo é executada.
        console.log("Opção inválida!");
        await askQuestion("Pressione Enter para continuar...");
        break;
    }
  }
  rl.close();
}

//carrega todos os dados antes de iniciar o programa
carregarDados();
// Inicia o programa
menu();
