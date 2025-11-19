"use strict";
// src/index.ts 
// Este arquivo importa as funções dos outros arquivos e executa o menu.
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
// Importa a lógica de CLI
var cli_1 = require("../src/utils/cli");
// Importa a lógica de armazenamento
var storage_service_1 = require("../src/services/storage.service");
// Importa os módulos de cada entidade
var cliente_1 = require("../src/modules/cliente");
var produto_1 = require("../src/modules/produto");
var pedido_1 = require("../src/modules/pedido");
var relatorios_1 = require("../src/modules/relatorios");
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
                    if (!!sair) return [3 /*break*/, 19];
                    // enquando sair NÂO for false, o while é executado
                    console.clear();
                    console.log("===== PIZZARIA  ====="); // e nesse while, é onde o usuário vai fazer todos os cadastros, as buscas, e pedido dos clientes
                    console.log("1. Cadastrar cliente"); // basta ele digitar o número que representa o que ele quer fazer dentro do sistema.
                    console.log("2. Listar clientes");
                    console.log("3. Cadastrar produto");
                    console.log("4. Listar produtos");
                    console.log("5. Realizar um pedido");
                    console.log("6. Ver relatórios");
                    console.log("7. Sair");
                    console.log("======================================");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Digite o número referente ao seu desejo: ")];
                case 2:
                    escolha = _b.sent();
                    _a = escolha;
                    switch (_a) {
                        case "1": return [3 /*break*/, 3];
                        case "2": return [3 /*break*/, 5];
                        case "3": return [3 /*break*/, 7];
                        case "4": return [3 /*break*/, 9];
                        case "5": return [3 /*break*/, 11];
                        case "6": return [3 /*break*/, 13];
                        case "7": return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 16];
                case 3: return [4 /*yield*/, (0, cliente_1.cadastrodeClientes)()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 18]; // quando o valor digitado no prompt acima pertencer a algum case, o respectivo case...
                case 5: return [4 /*yield*/, (0, cliente_1.buscarClientes)()];
                case 6:
                    _b.sent(); // chamará a função que está linkada nele
                    return [3 /*break*/, 18];
                case 7: return [4 /*yield*/, (0, produto_1.cadastrodeProduto)()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 9: return [4 /*yield*/, (0, produto_1.buscarProdutos)()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 11: return [4 /*yield*/, (0, pedido_1.realizarPedido)()];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 13: return [4 /*yield*/, (0, relatorios_1.mostrarRelatorios)()];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 15:
                    (0, storage_service_1.salvarDados)(); // quando o usuário quiser sair, todos os dados serão salvos.
                    console.log("Até logo!!");
                    sair = true; // sair vira true e o programa é finalizado.
                    return [3 /*break*/, 18];
                case 16:
                    console.log("Opção inválida!");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Pressione Enter para continuar...")];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 1];
                case 19:
                    cli_1.rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
//carrega todos os dados antes de iniciar o programa
(0, storage_service_1.carregarDados)();
// Inicia o programa
menu();
