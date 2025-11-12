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
exports.mostrarRelatorios = mostrarRelatorios;
// src/modules/relatorio.module.ts
var cli_1 = require("../src/utils/cli");
var storage_service_1 = require("../src/services/storage.service");
// Função auxiliar para verificar se duas datas são no mesmo dia
function isMesmoDia(date1, date2) {
    // Se date1 (pedido.dataCriacao) for 'undefined' ou uma 'Data Inválida'
    // (de um pedido antigo do CSV), retorna 'false' e não tenta ler 'getFullYear'.
    if (!date1 || isNaN(date1.getTime())) {
        return false;
    }
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
function mostrarRelatorios() {
    return __awaiter(this, void 0, void 0, function () {
        var hoje, pedidosDoDia, pedidosDoMes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.clear();
                    console.log("------- RELATÓRIO DE PEDIDOS -------");
                    hoje = new Date();
                    pedidosDoDia = storage_service_1.pedidos.filter(function (pedido) {
                        return isMesmoDia(pedido.dataCriacao, hoje);
                    }).length;
                    pedidosDoMes = storage_service_1.pedidos.filter(function (pedido) {
                        // Checagem de segurança para datas indefinidas ou inválidas
                        if (!pedido.dataCriacao || isNaN(pedido.dataCriacao.getTime())) {
                            return false;
                        }
                        // Se a data for válida, faz a comparação
                        return (pedido.dataCriacao.getMonth() === hoje.getMonth() &&
                            pedido.dataCriacao.getFullYear() === hoje.getFullYear());
                    }).length;
                    console.log("\nPedidos realizados HOJE: ".concat(pedidosDoDia));
                    console.log("Pedidos realizados este M\u00CAS: ".concat(pedidosDoMes));
                    console.log("\n------------------------------------");
                    return [4 /*yield*/, (0, cli_1.askQuestion)("Pressione ENTER para voltar ao menu...")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
