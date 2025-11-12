"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidos = exports.produtos = exports.clientes = void 0;
exports.salvarDados = salvarDados;
exports.carregarDados = carregarDados;
// src/services/storage.service.ts
var fs = require("fs"); // essa linha é responsável por ler, escrever e criar pasts.
var path = require("path"); // essa linha ajuda no trabalho com o caminho dos arquivos.
// Arrays para armazenar dados em memória
exports.clientes = []; // Array para armazenar clientes
exports.produtos = []; // Array para armazenar produtos
exports.pedidos = []; // Array para armazenar os pedidos
//Esse blodo de código é o responsavel pelo armazenamento dos dadosd.
// definição dos caminhos dos arquivos csv.
// CUIDADO: __dirname agora aponta para 'src/services', então usamos '..' duas vezes.
var DATA_DIR = path.resolve(__dirname, "..", "..", "data"); //código de organização das pastas.
var CLIENTES_CSV = path.join(DATA_DIR, "clientes.csv");
var PRODUTOS_CSV = path.join(DATA_DIR, "produtos.csv");
var PEDIDOS_CSV = path.join(DATA_DIR, "pedidos.csv");
var ITENS_PEDIDO_CSV = path.join(DATA_DIR, "itens_pedido.csv");
// Salva todos os dados dos arrays em memória para os arquivos CSV.
function salvarDados() {
    //um if else, pra saber se o diretório existe.
    if (!fs.existsSync(DATA_DIR)) {
        // se o diretório "DATA_DIR" não existir
        fs.mkdirSync(DATA_DIR, { recursive: true }); // ele será criado
    } // 1. Salvar Clientes
    var cabecalhoArquivoDoCliente = "id,nome,contato\n"; // Essa são as informações que o arquivo csv vai guardar dos clientes.
    var corpoArquivoCliente = exports.clientes
        .map(function (cliente) { return "".concat(cliente.id, ",").concat(cliente.nome, ",").concat(cliente.contato); })
        .join("\n"); // as informações irão ficar dessa forma no arquivo: id, nome, contato, e no final a linha sera quebrada.
    fs.writeFileSync(CLIENTES_CSV, cabecalhoArquivoDoCliente + corpoArquivoCliente); // 2. Salvar Produtos
    // Nessa linha de código, o arquivo csv, vai receber as informações do cabeçalho e do corpo do arquivo.
    var cabecalhoArquivoDoProduto = "id,nome,preco\n";
    var corpoArquivoProdutos = exports.produtos
        .map(function (produtos) { return "".concat(produtos.id, ",").concat(produtos.nome, ",").concat(produtos.preco); })
        .join("\n");
    fs.writeFileSync(PRODUTOS_CSV, cabecalhoArquivoDoProduto + corpoArquivoProdutos); // 3. Salvar Pedidos (com referência ao ID do cliente)
    // Esse bloco de código funciona da mesma maneira que o anterior
    var cabecalhoPedido = "id,cliente_id,total,formaPagamento\n";
    var corpoPedido = exports.pedidos
        .map(function (pedidos) {
        return "".concat(pedidos.id, ",").concat(pedidos.cliente.id, ",").concat(pedidos.total, ",").concat(pedidos.formaPagamento);
    })
        .join("\n");
    fs.writeFileSync(PEDIDOS_CSV, cabecalhoPedido + corpoPedido); // 4. Salvar Itens do Pedido (relacionando pedido e produto)
    var cabecalhoItens = "pedido_id,produto_id,quantidade\n";
    var corpoItens = [];
    exports.pedidos.forEach(function (pedido) {
        //aqui um laço que vai percorrer todo o array "pedidos"
        pedido.itens.forEach(function (item) {
            // e pra cada elemento encontrado
            corpoItens.push("".concat(pedido.id, ",").concat(item.produto.id, ",").concat(item.quantidade)); //este bloco é executado
        });
    });
    fs.writeFileSync(ITENS_PEDIDO_CSV, cabecalhoItens + corpoItens.join("\n")); // no final, o csv vai conter as informações deste bloco
}
// Esta função carrega todos os dados dos arquivos CSV para os arrays em memória (clientes, produtos, pedidos).
function carregarDados() {
    console.log("Carregando dados dos arquivos CSV..."); // O Programa verifica se o arquivo de cliente existe antes de tentar executar ele.
    if (fs.existsSync(CLIENTES_CSV)) {
        var data = fs.readFileSync(CLIENTES_CSV, "utf-8"); // Lê todo o conteúdo do arquivo CSV como um único texto.
        var lines = data.split("\n").slice(1); // Quebra o texto em um array de linhas, usando a quebra de linha ('\n') como separador. // .slice(1) remove o primeiro item do array (a linha do cabeçalho 'id,nome,contato'). // Agora, processamos cada linha para transformá-la de volta em um objeto Cliente.
        var novosClientes = lines
            .filter(function (line) { return line; }) // .filter(line => line) remove qualquer linha em branco que possa existir no final do arquivo.
            .map(function (line) {
            // .map() transforma cada item do array. Neste caso, cada 'linha' de texto vira um 'objeto'.
            // Quebra a linha '1,Ana Silva,119...' em um array ['1', 'Ana Silva', '119...'] usando a vírgula.
            var _a = line.split(","), id = _a[0], nome = _a[1], contato = _a[2]; // Transforma a linha '1,Ana Silva,119' em um array ['1', 'Ana Silva', '119'] usando a vírgula.
            return { id: parseInt(id), nome: nome, contato: parseInt(contato) }; // Retorna o objeto Cliente formatado, convertendo os IDs e contatos de texto para número.
        });
        // Atualiza o array original
        exports.clientes.length = 0;
        exports.clientes.push.apply(exports.clientes, novosClientes);
    } // O processo para carregar produtos é idêntico ao de clientes.
    if (fs.existsSync(PRODUTOS_CSV)) {
        var data = fs.readFileSync(PRODUTOS_CSV, "utf-8");
        var lines = data.split("\n").slice(1);
        var novosProdutos = lines
            .filter(function (line) { return line; })
            .map(function (line) {
            var _a = line.split(","), id = _a[0], nome = _a[1], preco = _a[2]; // A única diferença é usar parseFloat para o preço, pois ele pode ter casas decimais.
            return { id: parseInt(id), nome: nome, preco: parseFloat(preco) };
        });
        // Atualiza o array original
        exports.produtos.length = 0;
        exports.produtos.push.apply(exports.produtos, novosProdutos);
    } // --- Etapa 3: Reconstruir o Quebra-Cabeça (Pedidos e Itens) --- // checagem pra ver se os arquivos exitem
    if (fs.existsSync(PEDIDOS_CSV) && fs.existsSync(ITENS_PEDIDO_CSV)) {
        //checa se os arquivos existem
        // 3a. Primeiro, carregamos TODOS os itens de TODOS os pedidos para um array temporário.
        var itensData = fs.readFileSync(ITENS_PEDIDO_CSV, "utf-8"); // o arquivo está sendo lido pelo método.
        var todosItens_1 = itensData
            .split("\n")
            .slice(1)
            .filter(function (line) { return line; })
            .map(function (line) {
            // .split(divide o texto em uma array, cada elemento se torna uma linha)
            //.slice(remove a primeira linha(cabeçalho))
            //.filter(remove linhas em branco)
            //.map(transforma cada linha do texto, em um objeto)
            var _a = line.split(","), pedido_id = _a[0], produto_id = _a[1], quantidade = _a[2];
            return {
                pedido_id: parseInt(pedido_id),
                produto_id: parseInt(produto_id),
                quantidade: parseInt(quantidade),
            };
        }); // 3b. Agora, carregamos os pedidos e usamos os dados que já temos para remontá-los.
        var pedidosData = fs.readFileSync(PEDIDOS_CSV, "utf-8"); // lê o arquivo.
        var novosPedidos = pedidosData
            .split("\n")
            .slice(1)
            .filter(function (line) { return line; })
            .map(function (line) {
            var _a = line.split(","), id = _a[0], cliente_id = _a[1], total = _a[2], formaPagamento = _a[3]; // essas serão as informações que aparecerão no arquivo de pedidos // --- INÍCIO DA RECONSTRUÇÃO --- // Para cada linha de pedido, usamos o 'cliente_id' para encontrar o OBJETO Cliente completo no array 'clientes'.
            var clienteDoPedido = exports.clientes.find(function (cliente) { return cliente.id === parseInt(cliente_id); });
            if (!clienteDoPedido)
                return null; // se o cliente não for encontrado (foi deletado), pulamos este pedido para evitar erro. // Agora, para o pedido atual, filtramos a lista pegando apenas os itens cujo pedido_id é igual ao id do pedido atual.
            var itensDestePedido = todosItens_1
                .filter(function (item) { return item.pedido_id === parseInt(id); }) // Com a lista de itens correta, fazemos um '.map()' para transformar cada item.
                .map(function (itemInfo) {
                // Para cada item, usamos o 'produto_id' para encontrar o OBJETO Produto completo no array 'produtos'.
                var produtoDoItem = exports.produtos.find(function (p) { return p.id === itemInfo.produto_id; }); // Medida de segurança: se o produto não for encontrado, pulamos este item.
                if (!produtoDoItem)
                    return null; // Retornamos o objeto no formato correto de 'ItemPedido', com o objeto Produto inteiro.
                return { produto: produtoDoItem, quantidade: itemInfo.quantidade };
            }) // No final, filtramos novamente para remover quaisquer itens que possam ter se tornado 'null'.
                .filter(function (item) { return item !== null; }); // Finalmente, retornamos o objeto Pedido completo, com todas as suas referências restauradas.
            return {
                id: parseInt(id),
                cliente: clienteDoPedido, // Aqui entra o objeto Cliente completo.
                total: parseFloat(total),
                formaPagamento: formaPagamento,
                itens: itensDestePedido, // E aqui entra o array de objetos ItemPedido completos.
            }; // No final, filtramos uma última vez para remover quaisquer pedidos que possam ter se tornado 'null'.
        })
            .filter(function (pedido) { return pedido !== null; });
        // Atualiza o array original
        exports.pedidos.length = 0;
        exports.pedidos.push.apply(exports.pedidos, novosPedidos);
    }
    console.log("Dados carregados. Sistema pronto.");
}
