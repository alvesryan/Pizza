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
exports.realizarPedido = realizarPedido;
// src/modules/pedido.module.ts
var cli_1 = require("../src/utils/cli");
var storage_service_1 = require("../src/services/storage.service");
var fs = require("fs");
var path = require("path");
//-Pedido
function realizarPedido() {
    return __awaiter(this, void 0, void 0, function () {
        var itensPedidos, i, clienteBuscado, idClienteStr, idCliente, clienteEncontrado, i, adicionandoItens, i, produtoDisponivel, idProdutoStr, idProduto, produtoEncontrado, i, quantidadeStr, quantidade, respostaUsuario, totalDoPedido, i, itemAtual, subtotalItem, metodoPagamento, escolhaPagamento, novoPedidoId, pedido, conteudoNota, NOTAS_DIR, nomeArquivo, caminhoArquivo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itensPedidos = [];
                    if (!(storage_service_1.clientes.length === 0 || storage_service_1.produtos.length === 0)) return [3 /*break*/, 2];
                    console.log("ERRO: É necessário ter ao menos um cliente e um produto cadastrado!");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("ENTER para continuar...")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2:
                    console.log("------------------- NOVO PEDIDO --------------------");
                    if (storage_service_1.clientes.length === 0) {
                        console.log("Não há clientes cadastrados até o momento!");
                    }
                    else {
                        for (i = 0; i < storage_service_1.clientes.length; i++) {
                            clienteBuscado = storage_service_1.clientes[i];
                            console.log("Id: ".concat(clienteBuscado.id, " | Nome: ").concat(clienteBuscado.nome, " | Contato: ").concat(clienteBuscado.contato));
                        }
                    }
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Digite o Id do cliente: ")];
                case 3:
                    idClienteStr = _a.sent();
                    idCliente = parseInt(idClienteStr);
                    clienteEncontrado = undefined;
                    for (i = 0; i < storage_service_1.clientes.length; i++) {
                        // se o Id do cliente solicitado for encontrado ele será colocado na variável
                        if (storage_service_1.clientes[i].id === idCliente) {
                            clienteEncontrado = storage_service_1.clientes[i];
                            break; // o loop para pois o valor ja foi encontrado
                        }
                    }
                    if (!!clienteEncontrado) return [3 /*break*/, 5];
                    // caso o cliente não exista, o console abaixo aparecera.
                    console.log("Cliente com este ID não foi encontrado!");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("ENTER para continuar...")];
                case 4:
                    _a.sent();
                    return [2 /*return*/]; //  aqui é a função é parada
                case 5:
                    adicionandoItens = true;
                    _a.label = 6;
                case 6:
                    if (!adicionandoItens) return [3 /*break*/, 14];
                    // enquanto "adicionarItens" for true , todo o bloco será executado.
                    console.clear();
                    console.log("CLIENTE: ".concat(clienteEncontrado.nome)); // clienteEncontrado.nome = o nome do cliente encontrado no laço for logo acima, que está dentro da lista "Cliente", será mostrado na tela.
                    for (i = 0; i < storage_service_1.produtos.length; i++) {
                        produtoDisponivel = storage_service_1.produtos[i];
                        console.log("".concat(produtoDisponivel.id, " - ").concat(produtoDisponivel.nome, " (R$ ").concat(produtoDisponivel.preco.toFixed(2), ")"));
                    }
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Digite o Id do produto: ")];
                case 7:
                    idProdutoStr = _a.sent();
                    idProduto = parseInt(idProdutoStr);
                    produtoEncontrado = undefined;
                    for (i = 0; i < storage_service_1.produtos.length; i++) {
                        //aqui o .lenth percorre toda a lista em busca do Id digitado.
                        if (storage_service_1.produtos[i].id === idProduto) {
                            // quando esse Id é encontrado, ele é adicionadoo na variável produtoEncontrado.
                            produtoEncontrado = storage_service_1.produtos[i];
                            break;
                        }
                    }
                    if (!!produtoEncontrado) return [3 /*break*/, 9];
                    // caso o Id não seja encontrado, o bloco abaixo será executado.
                    console.log("Produto com este ID não foi encontrado!");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("ENTER para continuar...")];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 6]; // Pula para a próxima volta do loop
                case 9: return [4 /*yield*/, (0, cli_1.askQuestion)("Quantidade de '".concat(produtoEncontrado.nome, "': "))];
                case 10:
                    quantidadeStr = _a.sent();
                    quantidade = parseInt(quantidadeStr);
                    if (!(quantidade <= 0 || isNaN(quantidade))) return [3 /*break*/, 12];
                    // caso o valor digitado seja 0, letras, ou n seja digitado nada, o bloco abaixo será executado.
                    console.log("Quantidade inválida. Adicione ao menos 1 item.");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("ENTER para continuar...")];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 6]; // pula pra proxima volta do loop
                case 12:
                    itensPedidos.push({ produto: produtoEncontrado, quantidade: quantidade }); // o .push vai trazer os dados coletado das variáveis "produtoEncontrado" e "quantidade" e armazenalos no array "itensPedido"
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Deseja adicionar outro produto? (s/n): ")];
                case 13:
                    respostaUsuario = _a.sent();
                    if (respostaUsuario.toLowerCase() !== "s") {
                        //se a resposta do usuário for diferente de s, então o looping será finalizado
                        // .toLowerCase() é um método de formatação, onde tudo que o usuário digitar será convertido em letras minúsculas.
                        adicionandoItens = false;
                    }
                    return [3 /*break*/, 6];
                case 14:
                    console.log("\n--- Finalizando Pedido ---"); // variável de valor total do pedido, tem valor 0 pois o programa ainda não foi iniado.
                    totalDoPedido = 0;
                    for (i = 0; i < itensPedidos.length; i++) {
                        itemAtual = itensPedidos[i];
                        subtotalItem = itemAtual.produto.preco * itemAtual.quantidade;
                        totalDoPedido = totalDoPedido + subtotalItem; //"totalDoPedido" vai receber seu valor mais o "subtotalItem"
                        console.log("- ".concat(itemAtual.produto.nome, " (x").concat(itemAtual.quantidade, "): R$ ").concat(subtotalItem.toFixed(2))); // e aqui tudo é empresso na tela.
                    } //Essa parte do código é onde o cliente vai escolher sua forma de pagamento.
                    console.log("----------Forma de Pagamento-------------");
                    console.log("1 - Pix.");
                    console.log("2 - Dinheiro");
                    console.log("3 - Débito");
                    console.log("4 - Crédito");
                    metodoPagamento = "";
                    _a.label = 15;
                case 15:
                    if (!(metodoPagamento === "")) return [3 /*break*/, 17];
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Digite qual será a forma de pagamento (1-4): ")];
                case 16:
                    escolhaPagamento = _a.sent();
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
                    return [3 /*break*/, 15];
                case 17:
                    novoPedidoId = 1;
                    if (storage_service_1.pedidos.length > 0) {
                        novoPedidoId = storage_service_1.pedidos[storage_service_1.pedidos.length - 1].id + 1;
                    }
                    pedido = {
                        id: novoPedidoId, // o pedido ganha um novo ID
                        cliente: clienteEncontrado, // nome do cliente que fez o pedido
                        itens: itensPedidos, // todos os itens do pedido
                        total: totalDoPedido, // e o valor total
                        formaPagamento: metodoPagamento, // e a forma de pagamento
                        dataCriacao: new Date(), // e a data de criação do pedido
                    };
                    storage_service_1.pedidos.push(pedido); // como nos outros .push, a variável pedido, leva seu valor para o array Pedido[]
                    conteudoNota = "\n---------------------------------\n        PIZZARIA - NOTA FISCAL\n---------------------------------\n\nN\u00DAMERO DO PEDIDO: ".concat(pedido.id, "\nCLIENTE: ").concat(pedido.cliente.nome, "\n\nITENS:\n").concat(pedido.itens
                        .map(function (item) {
                        return "  - ".concat(item.produto.nome, " (x").concat(item.quantidade, "): R$ ").concat((item.produto.preco * item.quantidade).toFixed(2));
                    })
                        .join("\n"), "\n\n---------------------------------\nTOTAL DO PEDIDO: R$ ").concat(pedido.total.toFixed(2), "\nFORMA DE PAGAMENTO: ").concat(pedido.formaPagamento, "\n---------------------------------\n  ");
                    NOTAS_DIR = path.resolve(__dirname, "..", "..", "notas_fiscais");
                    if (!fs.existsSync(NOTAS_DIR)) {
                        fs.mkdirSync(NOTAS_DIR, { recursive: true });
                    }
                    nomeArquivo = "pedido_".concat(pedido.id, ".txt");
                    caminhoArquivo = path.join(NOTAS_DIR, nomeArquivo);
                    try {
                        // Salva o arquivo de forma síncrona
                        fs.writeFileSync(caminhoArquivo, conteudoNota.trim());
                        // --- 4. Exibe a nota no console (como antes) e informa sobre o .txt ---
                        console.log("---------------------------------");
                        console.log("N\u00DAMERO DO PEDIDO: ".concat(pedido.id));
                        console.log("TOTAL DO PEDIDO: R$ ".concat(pedido.total.toFixed(2))); //toFixed(2) faz com que o preço tenha fixadamente 2 casas decimais.
                        console.log("FORMA DE PAGAMENTO: ".concat(pedido.formaPagamento));
                        console.log("\nPedido realizado com sucesso!");
                        console.log("\nNota fiscal em TXT salva em: ".concat(caminhoArquivo));
                    }
                    catch (error) {
                        console.log("\nPedido realizado com sucesso!");
                        // Verificamos se 'error' é um objeto de Erro antes de usar 'error.message'
                        if (error instanceof Error) {
                            console.log("ERRO AO SALVAR ARQUIVO TXT: ".concat(error.message));
                        }
                        else {
                            console.log("ERRO AO SALVAR ARQUIVO TXT: Ocorreu um erro desconhecido.");
                        }
                    }
                    return [4 /*yield*/, (0, cli_1.askQuestion)("ENTER para voltar ao menu...")];
                case 18:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
