"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const storage_service_1 = require("./services/storage.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
// --- ROTA DE LOGIN (Admin) ---
app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
    // Em produção, isso viria do banco de dados
    if (usuario === "admin" && senha === "123456") {
        res.json({ sucesso: true });
    }
    else {
        res.status(401).json({ sucesso: false });
    }
});
// --- ROTAS DE CLIENTES ---
app.get('/clientes', async (req, res) => {
    const lista = await (0, storage_service_1.listarClientes)();
    res.json(lista);
});
app.post('/clientes', async (req, res) => {
    const { nome, contato } = req.body;
    const novo = await (0, storage_service_1.adicionarCliente)(nome, contato);
    res.json(novo);
});
// --- ROTAS DE PRODUTOS ---
app.get('/produtos', async (req, res) => {
    const lista = await (0, storage_service_1.listarProdutos)();
    res.json(lista);
});
app.post('/produtos', async (req, res) => {
    const { nome, preco } = req.body;
    const novo = await (0, storage_service_1.adicionarProduto)(nome, parseFloat(preco));
    res.json(novo);
});
// --- ROTAS DE PEDIDOS ---
app.get('/pedidos', async (req, res) => {
    const lista = await (0, storage_service_1.listarPedidos)();
    res.json(lista);
});
app.post('/pedidos', async (req, res) => {
    try {
        const { clienteId, itens, total, formaPagamento } = req.body;
        const novo = await (0, storage_service_1.criarPedido)(parseInt(clienteId), itens, parseFloat(total), formaPagamento);
        res.json(novo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar pedido" });
    }
});
// Inicia o servidor
app.listen(3000, () => {
    console.clear();
    console.log("=================================================");
    console.log(" PIZZARIA RODANDO!");
    console.log(" API: http://localhost:3000");
    console.log(" Admin: Abra o arquivo index.html");
    console.log(" Totem: Abra o arquivo cliente.html");
    console.log("=================================================");
});
