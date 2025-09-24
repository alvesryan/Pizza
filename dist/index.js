"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline"); // Essa linha permite que o usuário interaja com o programa. podendo digitar na tela.
var fs = require("fs"); // essa linha é responsável por ler, escrever e criar pasts.
var path = require("path"); // essa linha ajuda no trabalho com o caminho dos arquivos.
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise(function (resolve) { return rl.question(query, resolve); });
}
var clientes = []; // Array para armazenar clientes
var produtos = []; // Array para armazenar produtos
var pedidos = []; // Array para armazenar os pedidos
//Esse blodo de código é o responsavel pelo armazenamento dos dadosd.
// definição dos caminhos dos arquivos csv.
var DATA_DIR = path.resolve(__dirname, '..', 'data'); //código de organização das pastas.
var CLIENTES_CSV = path.join(DATA_DIR, 'clientes.csv');
var PRODUTOS_CSV = path.join(DATA_DIR, 'produtos.csv');
var PEDIDOS_CSV = path.join(DATA_DIR, 'pedidos.csv');
var ITENS_PEDIDO_CSV = path.join(DATA_DIR, 'itens_pedido.csv');
// Salva todos os dados dos arrays em memória para os arquivos CSV.
function salvarDados() {
    //um if else, pra saber se o diretório existe.
    if (!fs.existsSync(DATA_DIR)) { // se o diretório "DATA_DIR" não existir
        fs.mkdirSync(DATA_DIR); // ele será criado
    }
    // 1. Salvar Clientes
    var cabecalhoArquivoDoCliente = 'id,nome,contato\n';
    var corpoArquivoCliente = clientes.map(function (cliente) { return "".concat(cliente.id, ",").concat(cliente.nome, ",").concat(cliente.contato); }).join('\n');
    fs.writeFileSync(CLIENTES_CSV, cabecalhoArquivoDoCliente + corpoArquivoCliente);
    // 2. Salvar Produtos
    var cabecalhoArquivoDoProduto = 'id,nome,preco\n';
    var corpoArquivoProdutos = produtos.map(function (p) { return "".concat(p.id, ",").concat(p.nome, ",").concat(p.preco); }).join('\n');
    fs.writeFileSync(PRODUTOS_CSV, cabecalhoArquivoDoProduto + corpoArquivoProdutos);
    // 3. Salvar Pedidos (com referência ao ID do cliente)
    var cabecalhoPedido = 'id,cliente_id,total,formaPagamento\n';
    var corpoPedido = pedidos.map(function (p) { return "".concat(p.id, ",").concat(p.cliente.id, ",").concat(p.total, ",").concat(p.formaPagamento); }).join('\n');
    fs.writeFileSync(PEDIDOS_CSV, cabecalhoPedido + corpoPedido);
    // 4. Salvar Itens do Pedido (relacionando pedido e produto)
    var cabecalhoItens = 'pedido_id,produto_id,quantidade\n';
    var corpoItens = [];
    pedidos.forEach(function (pedido) {
        pedido.itens.forEach(function (item) {
            corpoItens.push("".concat(pedido.id, ",").concat(item.produto.id, ",").concat(item.quantidade));
        });
    });
    fs.writeFileSync(ITENS_PEDIDO_CSV, cabecalhoItens + corpoItens.join('\n'));
    console.log('Dados salvos com sucesso!');
}
// Esta função carrega todos os dados dos arquivos CSV para os arrays em memória (clientes, produtos, pedidos).
function carregarDados() {
    console.log('Carregando dados dos arquivos CSV...');
    // O Programa verifica se o arquivo de cliente existe antes de tentar executar ele.
    if (fs.existsSync(CLIENTES_CSV)) {
        var data = fs.readFileSync(CLIENTES_CSV, 'utf-8'); // Lê todo o conteúdo do arquivo CSV como um único texto.
        var lines = data.split('\n').slice(1); // Quebra o texto em um array de linhas, usando a quebra de linha ('\n') como separador.
        // .slice(1) remove o primeiro item do array (a linha do cabeçalho 'id,nome,contato').
        // Agora, processamos cada linha para transformá-la de volta em um objeto Cliente.
        clientes = lines
            .filter(function (line) { return line; }) // .filter(line => line) remove qualquer linha em branco que possa existir no final do arquivo.
            .map(function (line) {
            // Quebra a linha '1,Ana Silva,119...' em um array ['1', 'Ana Silva', '119...'] usando a vírgula.
            var _a = line.split(','), id = _a[0], nome = _a[1], contato = _a[2]; // Transforma a linha '1,Ana Silva,119' em um array ['1', 'Ana Silva', '119'] usando a vírgula.
            return { id: parseInt(id), nome: nome, contato: parseInt(contato) }; // Retorna o objeto Cliente formatado, convertendo os IDs e contatos de texto para número.
        });
    }
    // O processo para carregar produtos é idêntico ao de clientes.
    if (fs.existsSync(PRODUTOS_CSV)) {
        var data = fs.readFileSync(PRODUTOS_CSV, 'utf-8');
        var lines = data.split('\n').slice(1);
        produtos = lines
            .filter(function (line) { return line; })
            .map(function (line) {
            var _a = line.split(','), id = _a[0], nome = _a[1], preco = _a[2];
            // A única diferença é usar parseFloat para o preço, pois ele pode ter casas decimais.
            return { id: parseInt(id), nome: nome, preco: parseFloat(preco) };
        });
    }
    // --- Etapa 3: Reconstruir o Quebra-Cabeça (Pedidos e Itens) ---
    // checagem pra ver se os arquivos exitem
    if (fs.existsSync(PEDIDOS_CSV) && fs.existsSync(ITENS_PEDIDO_CSV)) {
        // 3a. Primeiro, carregamos TODOS os itens de TODOS os pedidos para um array temporário.
        var itensData = fs.readFileSync(ITENS_PEDIDO_CSV, 'utf-8'); // o arquivo está sendo lido pelo método.
        var todosItens_1 = itensData.split('\n').slice(1).filter(function (line) { return line; }).map(function (line) {
            // .split, divide toda a array em linhas.
            var _a = line.split(','), pedido_id = _a[0], produto_id = _a[1], quantidade = _a[2];
            // os IDs só seram guardados até aqui.
            return {
                pedido_id: parseInt(pedido_id),
                produto_id: parseInt(produto_id),
                quantidade: parseInt(quantidade)
            };
        });
        // 3b. Agora, carregamos os pedidos e usamos os dados que já temos para remontá-los.
        var pedidosData = fs.readFileSync(PEDIDOS_CSV, 'utf-8'); // lê o arquivo.
        pedidos = pedidosData.split('\n').slice(1).filter(function (line) { return line; }).map(function (line) {
            var _a = line.split(','), id = _a[0], cliente_id = _a[1], total = _a[2], formaPagamento = _a[3];
            // --- INÍCIO DA RECONSTRUÇÃO ---
            // Para cada linha de pedido, usamos o 'cliente_id' para encontrar o OBJETO Cliente completo no array 'clientes'.
            var clienteDoPedido = clientes.find(function (cliente) { return cliente.id === parseInt(cliente_id); });
            if (!clienteDoPedido)
                return null; // se o cliente não for encontrado (foi deletado), pulamos este pedido para evitar erro.
            // Agora, para o pedido atual, filtramos a lista 'todosItens' para pegar apenas os itens que pertencem a ele.
            var itensDestePedido = todosItens_1
                .filter(function (item) { return item.pedido_id === parseInt(id); })
                // Com a lista de itens correta, fazemos um '.map()' para transformar cada item.
                .map(function (itemInfo) {
                // Para cada item, usamos o 'produto_id' para encontrar o OBJETO Produto completo no array 'produtos'.
                var produtoDoItem = produtos.find(function (p) { return p.id === itemInfo.produto_id; });
                // Medida de segurança: se o produto não for encontrado, pulamos este item.
                if (!produtoDoItem)
                    return null;
                // Retornamos o objeto no formato correto de 'ItemPedido', com o objeto Produto inteiro.
                return { produto: produtoDoItem, quantidade: itemInfo.quantidade };
            })
                // No final, filtramos novamente para remover quaisquer itens que possam ter se tornado 'null'.
                .filter(function (item) { return item !== null; });
            // Finalmente, retornamos o objeto Pedido completo, com todas as suas referências restauradas.
            return {
                id: parseInt(id),
                cliente: clienteDoPedido, // Aqui entra o objeto Cliente completo.
                total: parseFloat(total),
                formaPagamento: formaPagamento,
                itens: itensDestePedido // E aqui entra o array de objetos ItemPedido completos.
            };
            // No final, filtramos uma última vez para remover quaisquer pedidos que possam ter se tornado 'null'.
        }).filter(function (pedido) { return pedido !== null; });
    }
    console.log('Dados carregados. Sistema pronto.');
}
//CADASTRO DE CLIENTE
function cadastrodeClientes() {
    return __awaiter(this, void 0, void 0, function () {
        var nomeCliente, contatoClienteStr, contatoCliente, clienteId, ultimoCliente, cadastroCliente;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear();
                    console.log('-------- CADASTRO DE CLIENTES -------');
                    return [4 /*yield*/, askQuestion('Nome do cliente: ')];
                case 1:
                    nomeCliente = _a.sent();
                    return [4 /*yield*/, askQuestion('Número de contato do cliente: ')];
                case 2:
                    contatoClienteStr = _a.sent();
                    contatoCliente = parseInt(contatoClienteStr);
                    if (clientes.length > 0) { // se o array Cliente não estiver vazia,
                        ultimoCliente = clientes[clientes.length - 1];
                        clienteId = ultimoCliente.id + 1;
                    }
                    else { // se a array estiver vazia, então significa que é o primeiro cliente, então ele terá o primeiro I
                        clienteId = 1;
                    }
                    cadastroCliente = {
                        id: clienteId, //Id do cliente
                        nome: nomeCliente, // seu nome
                        contato: contatoCliente // e o telefone de contato
                    };
                    clientes.push(cadastroCliente); //".push" leva os dados da variável "cadastroCliente" para a lista "clientes"
                    console.log("\nCliente '".concat(cadastroCliente.nome, "' cadastrado com sucesso!")); // e aqui uma confirmação de cadastro, utilando o nome do cliente
                    return [4 /*yield*/, askQuestion('ENTER para continuar')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// BUSCADOR DE CLIENTE 
function buscarClientes() {
    return __awaiter(this, void 0, void 0, function () {
        var i, clienteBuscado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear();
                    console.log('------ BUSCAR CLIENTES ------');
                    if (!(clientes.length === 0)) return [3 /*break*/, 1];
                    console.log('Não há clientes cadastrados até o momento!');
                    return [3 /*break*/, 3];
                case 1:
                    for (i = 0; i < clientes.length; i++) { // esse loop ira percorrer todo o array(clientes) mostrando os clientes cadastrados.
                        clienteBuscado = clientes[i];
                        console.log("Id: ".concat(clienteBuscado.id, " | Nome: ").concat(clienteBuscado.nome, " | Contato: ").concat(clienteBuscado.contato));
                        // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
                    }
                    return [4 /*yield*/, askQuestion('ENTER para continuar:')];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
//CADASTRO DE PRODUTO 
function cadastrodeProduto() {
    return __awaiter(this, void 0, void 0, function () {
        var nomeProduto, precoProdutoStr, precoProduto, produtoId, ultimoProduto, cadastroProduto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear();
                    console.log('----------- CADASTRO DE PRODUTOS ------------');
                    return [4 /*yield*/, askQuestion('Nome do produto: ')];
                case 1:
                    nomeProduto = _a.sent();
                    return [4 /*yield*/, askQuestion('Preço do produto: ')];
                case 2:
                    precoProdutoStr = _a.sent();
                    precoProduto = parseFloat(precoProdutoStr);
                    if (produtos.length > 0) { // se o array produto não estiver vazia,
                        ultimoProduto = produtos[produtos.length - 1];
                        produtoId = ultimoProduto.id + 1;
                    }
                    else { // se a array estiver vazia, então significa que é o primeiro produto, então ele terá o primeiro Id
                        produtoId = 1;
                    }
                    cadastroProduto = {
                        id: produtoId, //Id do produto
                        nome: nomeProduto, //Nome do produto
                        preco: precoProduto, // preco do produto
                    };
                    produtos.push(cadastroProduto); // aqui todas as informações que foram obtidas pela variável "cadastroProduto" serão transferidas para o array "Produto"
                    console.log("\nProduto '".concat(cadastroProduto.nome, "' cadastrado com sucesso!")); // e aqui a confirmação de que o produto foi cadastrado.
                    return [4 /*yield*/, askQuestion('ENTER para continuar')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//BUSCADOR DE PRODUTOS
function buscarProdutos() {
    return __awaiter(this, void 0, void 0, function () {
        var i, produtoBuscado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear();
                    console.log('------------ BUSCADOR DE PRODUTOS -------------');
                    for (i = 0; i < produtos.length; i++) { // esse loop ira ter o mesmo papel do loop de buscar clientes, ele percorre todo o array(produtos) mostrando os produtos cadastrados.
                        produtoBuscado = produtos[i];
                        console.log("Id: ".concat(produtoBuscado.id, " | Nome: ").concat(produtoBuscado.nome, " | Pre\u00E7o: ").concat(produtoBuscado.preco.toFixed(2)));
                        // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
                    }
                    return [4 /*yield*/, askQuestion('ENTER para continuar:')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//-Pedido
function realizarPedido() {
    return __awaiter(this, void 0, void 0, function () {
        var itensPedidos, i, clienteBuscado, idClienteStr, idCliente, clienteEncontrado, i, adicionandoItens, i, produtoDisponivel, idProdutoStr, idProduto, produtoEncontrado, i, quantidadeStr, quantidade, respostaUsuario, totalDoPedido, i, itemAtual, subtotalItem, metodoPagamento, escolhaPagamento, pedido;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itensPedidos = [];
                    if (!(clientes.length === 0 || produtos.length === 0)) return [3 /*break*/, 2];
                    console.log('ERRO: É necessário ter ao menos um cliente e um produto cadastrado!');
                    return [4 /*yield*/, askQuestion('ENTER para continuar...')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2:
                    console.log('------------------- NOVO PEDIDO --------------------');
                    if (clientes.length === 0) {
                        console.log('Não há clientes cadastrados até o momento!');
                    }
                    else {
                        for (i = 0; i < clientes.length; i++) {
                            clienteBuscado = clientes[i];
                            console.log("Id: ".concat(clienteBuscado.id, " | Nome: ").concat(clienteBuscado.nome, " | Contato: ").concat(clienteBuscado.contato));
                        }
                    }
                    return [4 /*yield*/, askQuestion('Digite o Id do cliente: ')];
                case 3:
                    idClienteStr = _a.sent();
                    idCliente = parseInt(idClienteStr);
                    clienteEncontrado = undefined;
                    // o for abaixo percorre a lista "clientes" de uma ponta a outra, ou até encontar o valor do id do cliente solicitado 
                    for (i = 0; i < clientes.length; i++) {
                        // se o Id do cliente solicitado for encontrado ele será colocado na variável
                        if (clientes[i].id === idCliente) {
                            clienteEncontrado = clientes[i];
                            break; // o loop para pois o valor ja foi encontrado
                        }
                    }
                    if (!!clienteEncontrado) return [3 /*break*/, 5];
                    console.log('Cliente com este ID não foi encontrado!');
                    return [4 /*yield*/, askQuestion('ENTER para continuar...')];
                case 4:
                    _a.sent();
                    return [2 /*return*/]; //  aqui é a função é parada
                case 5:
                    adicionandoItens = true;
                    _a.label = 6;
                case 6:
                    if (!adicionandoItens) return [3 /*break*/, 14];
                    console.clear();
                    console.log("CLIENTE: ".concat(clienteEncontrado.nome)); // clienteEncontrado.nome = o nome do cliente encontrado no laço for logo acima, que está dentro da lista "Cliente", será mostrado na tela.
                    for (i = 0; i < produtos.length; i++) {
                        produtoDisponivel = produtos[i];
                        // E mostro as informações desse produto específico
                        console.log("".concat(produtoDisponivel.id, " - ").concat(produtoDisponivel.nome, " (R$ ").concat(produtoDisponivel.preco.toFixed(2), ")"));
                    }
                    return [4 /*yield*/, askQuestion('Digite o Id do produto: ')];
                case 7:
                    idProdutoStr = _a.sent();
                    idProduto = parseInt(idProdutoStr);
                    produtoEncontrado = undefined;
                    for (i = 0; i < produtos.length; i++) { //aqui o .lenth percorre toda a lista em busca do Id digitado.
                        if (produtos[i].id === idProduto) { // quando esse Id é encontrado, ele é adicionadoo na variável produtoEncontrado.
                            produtoEncontrado = produtos[i];
                            break;
                        }
                    }
                    if (!!produtoEncontrado) return [3 /*break*/, 9];
                    console.log('Produto com este ID não foi encontrado!');
                    return [4 /*yield*/, askQuestion('ENTER para continuar...')];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 6]; // Pula para a próxima volta do loop
                case 9: return [4 /*yield*/, askQuestion("Quantidade de '".concat(produtoEncontrado.nome, "': "))];
                case 10:
                    quantidadeStr = _a.sent();
                    quantidade = parseInt(quantidadeStr);
                    if (!(quantidade <= 0 || isNaN(quantidade))) return [3 /*break*/, 12];
                    console.log('Quantidade inválida. Adicione ao menos 1 item.');
                    return [4 /*yield*/, askQuestion('ENTER para continuar...')];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 6]; // pula pra proxima volta do loop
                case 12:
                    itensPedidos.push({ produto: produtoEncontrado, quantidade: quantidade }); // o .push vai trazer os dados coletado das variáveis "produtoEncontrado" e "quantidade" e armazenalos no array "itensPedido"
                    return [4 /*yield*/, askQuestion('Deseja adicionar outro produto? (s/n): ')];
                case 13:
                    respostaUsuario = _a.sent();
                    // Se a resposta do usuário não for 's', a variável de controle vira 'false'
                    // e o loop 'while' irá parar na próxima verificação.
                    if (respostaUsuario.toLowerCase() !== 's') { //se a resposta do usuário for diferente de s, então o looping será finalizado
                        // .toLowerCase() é um método de formatação, onde tudo que o usuário digitar será convertido em letras minúsculas.
                        adicionandoItens = false;
                    }
                    return [3 /*break*/, 6];
                case 14:
                    console.log('\n--- Finalizando Pedido ---');
                    totalDoPedido = 0;
                    //percorro toda a variável "itensPedidos" e adiciono seus valores na variável itemAtual
                    for (i = 0; i < itensPedidos.length; i++) {
                        itemAtual = itensPedidos[i];
                        subtotalItem = itemAtual.produto.preco * itemAtual.quantidade;
                        totalDoPedido = totalDoPedido + subtotalItem; //"totalDoPedido" vai receber seu valor mais o "subtotalItem"
                        console.log("- ".concat(itemAtual.produto.nome, " (x").concat(itemAtual.quantidade, "): R$ ").concat(subtotalItem.toFixed(2))); // e aqui tudo é empresso na tela.
                    }
                    //Essa parte do código é onde o cliente vai escolher sua forma de pagamento.
                    console.log('----------Forma de Pagamento-------------');
                    console.log('1 - Pix.');
                    console.log('2 - Dinheiro');
                    console.log('3 - Débito');
                    console.log('4 - Crédito');
                    metodoPagamento = '' // declaro uma variável vazia para que o valor que ela ira receber, possa ser adicionado depois no switch.
                    ;
                    _a.label = 15;
                case 15:
                    if (!(metodoPagamento === '')) return [3 /*break*/, 17];
                    return [4 /*yield*/, askQuestion('Digite qual será a forma de pagamento (1-4): ')];
                case 16:
                    escolhaPagamento = _a.sent();
                    switch (escolhaPagamento) {
                        case '1':
                            metodoPagamento = 'Pix';
                            break;
                        case '2':
                            metodoPagamento = 'Dinheiro';
                            break;
                        case '3':
                            metodoPagamento = 'Débito';
                            break;
                        case '4':
                            metodoPagamento = 'Crédito';
                            break;
                        default:
                            console.log('Digite uma opção válida!'); // e o loop continua, por que a variável "metodoPagamento" não teve seu valor altearado.
                            break;
                    }
                    return [3 /*break*/, 15];
                case 17:
                    pedido = {
                        id: pedidos.length + 1, // o pedido ganha um novo ID, que é o igual ao ultimo Id + 1
                        cliente: clienteEncontrado, // nome do cliente que fez o pedido
                        itens: itensPedidos, // todos os itens do pedido
                        total: totalDoPedido, // e o valor total 
                        formaPagamento: metodoPagamento, // e a forma de pagamento
                    };
                    pedidos.push(pedido); // como nos outros .push, a variável pedido, leva seu valor para o array Pedido[]
                    //Nota Fiscal.
                    console.log('---------------------------------');
                    console.log("N\u00DAMERO DO PEDIDO: ".concat(pedido.id));
                    console.log("TOTAL DO PEDIDO: R$ ".concat(pedido.total.toFixed(2))); //toFixed(2) faz com que o preço tenha fixadamente 2 casas decimais.
                    console.log("FORMA DE PAGAMENTO: ".concat(pedido.formaPagamento));
                    console.log('\nPedido realizado com sucesso!');
                    return [4 /*yield*/, askQuestion('ENTER para voltar ao menu...')];
                case 18:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//-MENU PRINCIPAL-
function menu() {
    return __awaiter(this, void 0, void 0, function () {
        var sair, escolha, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sair = false;
                    _b.label = 1;
                case 1:
                    if (!!sair) return [3 /*break*/, 17];
                    console.clear();
                    console.log("===== PIZZARIA  ====="); // e nesse while, é onde o usuário vai fazer todos os cadastros, as buscas, e pedido dos clientes
                    console.log("1. Cadastrar cliente"); // basta ele digitar o número que representa o que ele quer fazer dentro do sistema.
                    console.log("2. Buscar clientes");
                    console.log("3. Cadastrar produto");
                    console.log("4. Buscar produtos");
                    console.log('5. Realizar um pedido');
                    console.log("6. Sair");
                    console.log("======================================");
                    return [4 /*yield*/, askQuestion('Digite o número referente ao seu desejo: ')];
                case 2:
                    escolha = _b.sent();
                    _a = escolha;
                    switch (_a) {
                        case '1': return [3 /*break*/, 3];
                        case '2': return [3 /*break*/, 5];
                        case '3': return [3 /*break*/, 7];
                        case '4': return [3 /*break*/, 9];
                        case '5': return [3 /*break*/, 11];
                        case '6': return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 14];
                case 3: return [4 /*yield*/, cadastrodeClientes()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 16]; // quando o valor digitado no prompt acima pertencer a algum case, o respectivo case...
                case 5: return [4 /*yield*/, buscarClientes()];
                case 6:
                    _b.sent(); // chamará a função que está linkada nele
                    return [3 /*break*/, 16];
                case 7: return [4 /*yield*/, cadastrodeProduto()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 9: return [4 /*yield*/, buscarProdutos()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 11: return [4 /*yield*/, realizarPedido()];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 13:
                    salvarDados(); // quando o usuário quiser sair, todos os dados serão salvos.
                    console.log("Até logo!!");
                    sair = true; // sair vira true e o programa é finalizado.
                    return [3 /*break*/, 16];
                case 14:
                    console.log("Opção inválida!");
                    return [4 /*yield*/, askQuestion("Pressione Enter para continuar...")];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 16: return [3 /*break*/, 1];
                case 17:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
//carrega todos os dados antes de iniciar o programa
carregarDados();
// Inicia o programa
menu();
