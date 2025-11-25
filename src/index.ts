// O Express é o framework que gerencia o servidor e as rotas
import express from 'express'; 

// O CORS (Cross-Origin Resource Sharing) é o "segurança".
// Ele permite que o Front-end (que roda em outra porta) converse com este Back-end.
import cors from 'cors'; 

// Importamos APENAS as funções específicas que criamos no arquivo de serviços.
// Isso conecta o servidor à lógica do banco de dados (Prisma).
import { 
    listarClientes, adicionarCliente, 
    listarProdutos, adicionarProduto, 
    listarPedidos, criarPedido 
} from './services/storage.service';


const app = express(); // Cria a instância do servidor (a "alma" da aplicação)

// MIDDLEWARES (Configurações que rodam antes de qualquer rota):

// Habilita o servidor a ler JSON. Sem isso, o 'req.body' chegaria indefinido.
app.use(express.json()); 

// Libera o acesso para qualquer origem (sites externos). 
app.use(cors()); 

// Define a pasta 'public' como estática.
// Se o usuário acessar http://localhost:3000/cliente.html, o servidor busca direto lá.
app.use(express.static('public'));


//Endpoints

// --- ROTA DE LOGIN (Admin) ---
app.post('/login', (req, res) => {
    // Desestruturação: extrai 'usuario' e 'senha' de dentro do objeto req.body
    const { usuario, senha } = req.body;
    
    // Validação simples (Hardcoded).
    // Em um sistema real, aqui consultaríamos a tabela de Usuários no banco.
    if (usuario === "admin" && senha === "123456") {
        // HTTP 200 (OK) é o padrão quando usamos res.json()
        res.json({ sucesso: true });
    } else {
        // HTTP 401 (Unauthorized): Informa ao navegador que a autenticação falhou
        res.status(401).json({ sucesso: false });
    }
});

// --- ROTAS DE CLIENTES ---

// GET: Usado apenas para BUSCAR dados.
// 'async' é obrigatório porque o banco de dados demora um pouco para responder.
app.get('/clientes', async (req, res) => {
    // 'await': O código PAUSA aqui até o banco devolver a lista.
    const lista = await listarClientes();
    res.json(lista); // Envia a lista pronta para o Front-end
});

// POST: Usado para CRIAR/ENVIAR dados novos.
app.post('/clientes', async (req, res) => {
    const { nome, contato } = req.body; // Pega os dados enviados pelo formulário
    const novo = await adicionarCliente(nome, contato); // Manda gravar no banco
    res.json(novo); // Devolve o cliente criado
});

// --- ROTAS DE PRODUTOS ---

app.get('/produtos', async (req, res) => {
    const lista = await listarProdutos();
    res.json(lista);
});

app.post('/produtos', async (req, res) => {
    const { nome, preco } = req.body;
    // parseFloat garante que o preço seja tratado como número (ex: "10.50" vira 10.5)
    const novo = await adicionarProduto(nome, parseFloat(preco));
    res.json(novo);
});

// --- ROTAS DE PEDIDOS ---

app.get('/pedidos', async (req, res) => {
    const lista = await listarPedidos();
    res.json(lista);
});

// Esta rota é mais complexa, por isso usamos TRY/CATCH para evitar que o servidor caia.
app.post('/pedidos', async (req, res) => {
    try {
        // Recebe o objeto completo do pedido
        const { clienteId, itens, total, formaPagamento } = req.body;
        
        // Chama a função complexa que salva o pedido e os itens no banco
        const novo = await criarPedido(
            parseInt(clienteId), // Converte ID para inteiro (segurança de tipo)
            itens, 
            parseFloat(total), 
            formaPagamento
        );
        
        res.json(novo);

    } catch (error) {
        // Se der qualquer erro (banco fora do ar, ID inválido, etc), cai aqui.
        console.error(error); // Mostra o erro no SEU terminal (para debug)
        
        // HTTP 500 (Internal Server Error): Avisa o Front-end que algo quebrou no servidor
        res.status(500).json({ error: "Erro ao criar pedido" });
    }
});


app.listen(3000, () => {
    console.clear();
    
    console.log("=================================================");
    console.log(" 🍕 PIZZARIA RODANDO!");
    console.log(" 📡 API: http://localhost:3000");
    console.log(" 👤 Admin: Abra o arquivo index.html");
    console.log(" 🖥️  Totem: Abra o arquivo cliente.html");
    console.log("=================================================");
});