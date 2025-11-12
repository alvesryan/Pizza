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
exports.cadastrodeProduto = cadastrodeProduto;
exports.buscarProdutos = buscarProdutos;
// src/modules/produto.module.ts
var cli_1 = require("../src/utils/cli");
var storage_service_1 = require("../src/services/storage.service");
//CADASTRO DE PRODUTO
function cadastrodeProduto() {
    return __awaiter(this, void 0, void 0, function () {
        var nomeProduto, precoProdutoStr, precoProduto, produtoId, ultimoProduto, cadastroProduto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear();
                    console.log("----------- CADASTRO DE PRODUTOS ------------");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Nome do produto: ")];
                case 1:
                    nomeProduto = _a.sent();
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Preço do produto: ")];
                case 2:
                    precoProdutoStr = _a.sent();
                    precoProduto = parseFloat(precoProdutoStr);
                    if (storage_service_1.produtos.length > 0) {
                        ultimoProduto = storage_service_1.produtos[storage_service_1.produtos.length - 1];
                        produtoId = ultimoProduto.id + 1;
                    }
                    else {
                        // se a array estiver vazia, então significa que é o primeiro produto, então ele terá o primeiro Id
                        produtoId = 1;
                    }
                    cadastroProduto = {
                        // as informações da variável "cadastroProduto" serão levadas para o objeto produto.
                        id: produtoId, //Id do produto
                        nome: nomeProduto, //Nome do produto
                        preco: precoProduto, // preco do produto
                    };
                    storage_service_1.produtos.push(cadastroProduto); // aqui todas as informações que foram obtidas pela variável "cadastroProduto" serão transferidas para o array "Produto"
                    console.log("\nProduto '".concat(cadastroProduto.nome, "' cadastrado com sucesso!")); // e aqui a confirmação de que o produto foi cadastrado.
                    return [4 /*yield*/, (0, cli_1.askQuestion)("ENTER para continuar")];
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
                    console.log("------------ BUSCADOR DE PRODUTOS -------------");
                    if (storage_service_1.produtos.length === 0) {
                        console.log("Não há produtos cadastrados.");
                    }
                    else {
                        for (i = 0; i < storage_service_1.produtos.length; i++) {
                            produtoBuscado = storage_service_1.produtos[i];
                            console.log("Id: ".concat(produtoBuscado.id, " | Nome: ").concat(produtoBuscado.nome, " | Pre\u00E7o: ").concat(produtoBuscado.preco.toFixed(2))); // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
                        }
                    }
                    return [4 /*yield*/, (0, cli_1.askQuestion)("ENTER para continuar:")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
