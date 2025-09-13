"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)();
var clientes = []; // Array para armazenar clientes
var produtos = []; // Array para armazenar produtos
var pedidos = []; // Array para armazenar os pedidos
//CADASTRO DE CLIENTE
function cadastrodeClientes() {
    console.clear();
    console.log('-------- CADASTRO DE CLIENTES -------');
    var nomeCliente = prompt('Nome do cliente :');
    var contatoCliente = parseInt(prompt('Número de contato do cliente: '));
    var clienteId; // variável que irá guardar o Id do cliente.
    if (clientes.length > 0) { // se o array Cliente não estiver vazia,
        // pega o último cliente que foi adicionado, e o Id do novo cliente será o id do ultimo cliente + 1
        var ultimoCliente = clientes[clientes.length - 1];
        clienteId = ultimoCliente.id + 1;
    }
    else { // se a array estiver vazia, então significa que é o primeiro cliente, então ele terá o primeiro I
        clienteId = 1;
    }
    var cadastroCliente = {
        id: clienteId, //Id do cliente
        nome: nomeCliente, // seu nome
        contato: contatoCliente // e o telefone de contato
    };
    clientes.push(cadastroCliente); //".push" leva os dados da variável "cadastroCliente" para a lista "clientes"
    console.log("\nCliente '".concat(cadastroCliente.nome, "' cadastrado com sucesso!")); // e aqui uma confirmação de cadastro, utilando o nome do cliente
    prompt('ENTER para continuar');
}
// BUSCADOR DE CLIENTE 
function buscarClientes() {
    console.clear();
    console.log('------ BUSCAR CLIENTES ------');
    if (clientes.length === 0) { // se não houver clientes no array, o console abaixo é executado
        console.log('Não há clientes cadastrados até o momento!');
    }
    else { // se houver
        for (var i = 0; i < clientes.length; i++) { // esse loop ira percorrer todo o array(clientes) mostrando os clientes cadastrados.
            var clienteBuscado = clientes[i]; // a variável "clienteBuscado" ira receber o valor da array "clientes"
            console.log("Id: ".concat(clienteBuscado.id, " | Nome: ").concat(clienteBuscado.nome, " | Contato: ").concat(clienteBuscado.contato));
            // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
        }
        prompt('ENTER para continuar:');
    }
    //CADASTRO DE PRODUTO 
    function cadastrodeProduto() {
        console.clear();
        console.log('----------- CADASTRO DE PRODUTOS ------------');
        var nomeProduto = prompt('Nome do produto:');
        var precoProduto = parseFloat(prompt('Preço do produto'));
        var produtoId;
        if (produtos.length > 0) { // se o array produto não estiver vazia,
            // pega o último produto que foi adicionado, e o Id do novo produto será o id do ultimo produto + 1
            var ultimoProduto = produtos[produtos.length - 1];
            produtoId = ultimoProduto.id + 1;
        }
        else { // se a array estiver vazia, então significa que é o primeiro produto, então ele terá o primeiro Id
            produtoId = 1;
        }
        var cadastroProduto = {
            id: produtoId, //Id do produto
            nome: nomeProduto, //Nome do produto
            preco: precoProduto, // preco do produto
        };
        produtos.push(cadastroProduto); // aqui todas as informações que foram obtidas pela variável "cadastroProduto" serão transferidas para o array "Produto"
        console.log("\nProduto '".concat(cadastroProduto.nome, "' cadastrado com sucesso!")); // e aqui a confirmação de que o produto foi cadastrado.
        prompt('ENTER para continuar');
    }
    //BUSCADOR DE PRODUTOS
    function buscarProdutos() {
        console.clear();
        console.log('------------ BUSCADOR DE PRODUTOS -------------');
        for (var i = 0; i < produtos.length; i++) { // esse loop ira ter o mesmo papel do loop de buscar clientes, ele percorre todo o array(produtos) mostrando os produtos cadastrados.
            var produtoBuscado = produtos[i]; // a variável "produtoBuscado" ira receber o valor da array "produtos"
            console.log("Id: ".concat(produtoBuscado.id, " | Nome: ").concat(produtoBuscado.nome, " | Contato: ").concat(produtoBuscado.preco.toFixed(2)));
            // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
        }
        prompt('ENTER para continuar:');
    }
    //-Pedido
    function realizarPedido() {
        var itensPedidos = [];
        if (clientes.length === 0 || produtos.length === 0) {
            console.log('ERRO: É necessário ter ao menos um cliente e um produto cadastrado!');
            prompt('ENTER para continuar...');
            return;
        }
        console.log('------------------- NOVO PEDIDO --------------------');
        buscarClientes();
        var idCliente = parseInt(prompt('Digite o Id do cliente: '));
        //inicio da busca do cliente.
        var clienteEncontrado = undefined; // Crio uma "caixa" vazia para o cliente
        // o for abaixo percorre a lista "clientes" de uma ponta a outra, ou até encontar o valor do id do cliente solicitado 
        for (var i = 0; i < clientes.length; i++) {
            // se o Id do cliente solicitado for encontrado ele será colocado na variável
            if (clientes[i].id === idCliente) {
                clienteEncontrado = clientes[i];
                break; // o loop para pois o valor ja foi encontrado
            }
        }
        if (!clienteEncontrado) { // caso o cliente não exista, o console abaixo aparecera.
            console.log('Cliente com este ID não foi encontrado!');
            prompt('ENTER para continuar...');
            return; //  aqui é a função é parada
        }
        // varivel feita para controlar a duração do looping, enquanto seu valor for true, o looping será executado
        var adicionandoItens = true;
        while (adicionandoItens) { // enquanto "adicionarItens" for true , todo o bloco será executado.
            console.clear();
            console.log("CLIENTE: ".concat(clienteEncontrado.nome)); // clienteEncontrado.nome = o nome do cliente encontrado no laço for logo acima, que está dentro da lista "Cliente", será mostrado na tela.
            for (var i = 0; i < produtos.length; i++) {
                // A cada volta do loop, eu pego o produto que está na posição 'i' 
                var produtoDisponivel = produtos[i];
                // E mostro as informações desse produto específico
                console.log("".concat(produtoDisponivel.id, " - ").concat(produtoDisponivel.nome, " (R$ ").concat(produtoDisponivel.preco.toFixed(2), ")"));
            }
            var idProduto = parseInt(prompt('Digite o Id do produto: '));
            //aqui começa a busca pelo produto
            var produtoEncontrado = undefined; // mais uma vez com a criação de uma variável vazia.
            for (var i = 0; i < produtos.length; i++) { //aqui o .lenth percorre toda a lista em busca do Id digitado.
                if (produtos[i].id === idProduto) { // quando esse Id é encontrado, ele é adicionadoo na variável produtoEncontrado.
                    produtoEncontrado = produtos[i];
                    break;
                }
            }
            if (!produtoEncontrado) { // caso o Id não seja encontrado, o bloco abaixo será executado.
                console.log('Produto com este ID não foi encontrado!');
                prompt('ENTER para continuar...');
                continue; // Pula para a próxima volta do loop
            }
            var quantidade = parseInt(prompt("Quantidade de '".concat(produtoEncontrado.nome, "': "))); // aqui é feita a solicitação da quantidade deo produto selecionado.
            if (quantidade <= 0 || isNaN(quantidade)) { // caso o valor digitado seja 0, letras, ou n seja digitado nada, o bloco abaixo será executado.
                console.log('Quantidade inválida. Adicione ao menos 1 item.');
                prompt('ENTER para continuar...');
                continue; // pula pra proxima volta do loop
            }
            itensPedidos.push({ produto: produtoEncontrado, quantidade: quantidade }); // o .push vai trazer os dados coletado das variáveis "produtoEncontrado" e "quantidade" e armazenalos no array "itensPedido"
            var respostaUsuario = prompt('Deseja adicionar outro produto? (s/n): '); // a resposta do usuário é armazenada na constante "respostaUsuario"
            // Se a resposta do usuário não for 's', a variável de controle vira 'false'
            // e o loop 'while' irá parar na próxima verificação.
            if (respostaUsuario.toLowerCase() !== 's') { //se a resposta do usuário for diferente de s, então o looping será finalizado
                // .toLowerCase() é um método de formatação, onde tudo que o usuário digitar será convertido em letras minúsculas.
                adicionandoItens = false;
            }
        }
        console.log('\n--- Finalizando Pedido ---');
        // variável de valor total do pedido, tem valor 0 pois o programa ainda não foi iniado.
        var totalDoPedido = 0;
        //percorro toda a variável "itensPedidos" e adiciono seus valores na variável itemAtual
        for (var i = 0; i < itensPedidos.length; i++) {
            var itemAtual = itensPedidos[i];
            var subtotalItem = itemAtual.produto.preco * itemAtual.quantidade; //subtotalItem recebe o itemAtual.produto.preco e é multiplicado a quantidade do item atual
            totalDoPedido = totalDoPedido + subtotalItem; //"totalDoPedido" vai receber seu valor mais o "subtotalItem"
            console.log("- ".concat(itemAtual.produto.nome, " (x").concat(itemAtual.quantidade, "): R$ ").concat(subtotalItem.toFixed(2))); // e aqui tudo é empresso na tela.
        }
        var pedido = {
            id: pedidos.length + 1,
            cliente: clienteEncontrado, // nome do cliente que fez o pedido
            itens: itensPedidos, // todos os itens do pedido
            total: totalDoPedido // e o valor total 
        };
        pedidos.push(pedido); // como nos outros .push, a variável pedido, leva seu valor para o array Pedido[]
        console.log('---------------------------------');
        console.log("TOTAL DO PEDIDO: R$ ".concat(pedido.total.toFixed(2))); //toFixed(2) faz com que o preço tenha fixadamente 2 casas decimais.
        console.log('\nPedido realizado com sucesso!');
        prompt('ENTER para voltar ao menu...');
    }
    //-MENU PRINCIPAL-
    function menu() {
        var sair = false;
        while (!sair) { // enquando sair NÂO for false, o while é executado
            console.clear();
            console.log("===== PIZZARIA  ====="); // e nesse while, é onde o usuário vai fazer todos os cadastros, as buscas, e pedido dos clientes
            console.log("1. Cadastrar cliente"); // basta ele digitar o número que representa o que ele quer fazer dentro do sistema.
            console.log("2. Buscar clientes");
            console.log("3. Cadastrar produto");
            console.log("4. Buscar produtos");
            console.log('5. Realizar um pedido');
            console.log("6. Sair");
            console.log("======================================");
            var escolha = prompt('Digite o número referente ao seu desejo: ');
            switch (escolha) {
                case '1':
                    cadastrodeClientes();
                    break; // quando o valor digitado no prompt acima pertencer a algum case, o respectivo case...
                case '2':
                    buscarClientes();
                    break; // chamará a função que está linkada nele
                case '3':
                    cadastrodeProduto();
                    break;
                case '4':
                    buscarProdutos();
                    break;
                case '5':
                    realizarPedido();
                    break;
                case '6':
                    console.log("Obrigado por usar o sistema!");
                    sair = true;
                    break;
                default: // caso o usuário não digite nenhum valor existente no case, a mensagem abaixo é executada.
                    console.log("Opção inválida!");
                    prompt("Pressione Enter para continuar...");
                    break;
            }
        }
    }
    // Inicia o programa
    menu();
}
