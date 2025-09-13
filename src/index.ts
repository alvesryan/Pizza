import promptSync from 'prompt-sync';

const prompt = promptSync();

let clientes: Cliente[] = [] // Array para armazenar clientes
let produtos: Produto[] = [] // Array para armazenar produtos
let pedidos: Pedido[] = []   // Array para armazenar os pedidos


interface Cliente{ //Objetp Cliente
    id: number; // esse é o id que vai ser direcionado ao cliente.
    nome: string; //  essa variavel vai armazenar os nomes dos clientes.
    contato: number; // e essa registrar seu número de contato.
}
interface Produto{ //Objeto Produto
    id: number; //regustro do Id do produto.
    nome: string; // aqui é feito o registro de nome do produto.
    preco: number; // e aqui seu preço
}
interface ItemPedido{ // Objeto dos itens dos pedidos
    produto: Produto; // aqui qual o produto foi adicionado.
    quantidade: number; // e aqui a quantidade do produto para o pedido
}
interface Pedido{ // Objeto de realização do pedido.
    id: number; // o id do pedido
    cliente: Cliente; // o nome do cliente, que ja vai estar cadastrado
    itens: ItemPedido[]; //os itens do pedido, que também ja vão estar cadastrados
    total: number; // e o total a pagar do pedido
    formaPagamento: string; // varivel que vai guardar a forma de pagamento do cliente
}

//CADASTRO DE CLIENTE

function cadastrodeClientes(): void {
    console.clear()
    console.log('-------- CADASTRO DE CLIENTES -------')

    const nomeCliente = prompt('Nome do cliente :')
    const contatoCliente = parseInt(prompt('Número de contato do cliente: '))
    let clienteId: number; // variável que irá guardar o Id do cliente.

    if (clientes.length > 0) { // se o array Cliente não estiver vazia,
        // pega o último cliente que foi adicionado, e o Id do novo cliente será o id do ultimo cliente + 1
        const ultimoCliente = clientes[clientes.length - 1];
        clienteId = ultimoCliente.id + 1;
    } else { // se a array estiver vazia, então significa que é o primeiro cliente, então ele terá o primeiro I
        clienteId = 1;
    }

    const cadastroCliente: Cliente = { // a variável "cadastroCliente" armazena os dados coletados no objeto "Cliente"
        id : clienteId, //Id do cliente
        nome: nomeCliente, // seu nome
        contato: contatoCliente // e o telefone de contato
    };

    clientes.push(cadastroCliente) //".push" leva os dados da variável "cadastroCliente" para a lista "clientes"
    console.log(`\nCliente '${cadastroCliente.nome}' cadastrado com sucesso!`) // e aqui uma confirmação de cadastro, utilando o nome do cliente
    prompt('ENTER para continuar')
}



// BUSCADOR DE CLIENTE 

function buscarClientes(): void{
    console.clear()
    console.log('------ BUSCAR CLIENTES ------')

    if(clientes.length === 0){ // se não houver clientes no array, o console abaixo é executado
        console.log('Não há clientes cadastrados até o momento!')
    } else{ // se houver

    for(let i = 0; i < clientes.length; i++){ // esse loop ira percorrer todo o array(clientes) mostrando os clientes cadastrados.
        const clienteBuscado = clientes[i]; // a variável "clienteBuscado" ira receber o valor da array "clientes"
        
        console.log(`Id: ${clienteBuscado.id} | Nome: ${clienteBuscado.nome} | Contato: ${clienteBuscado.contato}`);
        // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
    }
    prompt('ENTER para continuar:')
    }
}

//CADASTRO DE PRODUTO 
function cadastrodeProduto(): void{
    console.clear()
    console.log('----------- CADASTRO DE PRODUTOS ------------')

    const nomeProduto = prompt('Nome do produto:')
    const precoProduto = parseFloat(prompt('Preço do produto'))
    let produtoId: number;
    
    if (produtos.length > 0) { // se o array produto não estiver vazia,
        // pega o último produto que foi adicionado, e o Id do novo produto será o id do ultimo produto + 1
        const ultimoProduto = produtos[produtos.length - 1];
        produtoId = ultimoProduto.id + 1;
    } else { // se a array estiver vazia, então significa que é o primeiro produto, então ele terá o primeiro Id
        produtoId = 1;
    }

    const cadastroProduto: Produto = { // as informações da variável "cadastroProduto" serão levadas para o objeto produto.
        id: produtoId, //Id do produto
        nome: nomeProduto, //Nome do produto
        preco: precoProduto, // preco do produto
    };

    produtos.push(cadastroProduto) // aqui todas as informações que foram obtidas pela variável "cadastroProduto" serão transferidas para o array "Produto"
    console.log(`\nProduto '${cadastroProduto.nome}' cadastrado com sucesso!`)// e aqui a confirmação de que o produto foi cadastrado.
    prompt('ENTER para continuar')
}

//BUSCADOR DE PRODUTOS

function buscarProdutos(): void{
    console.clear()
    console.log('------------ BUSCADOR DE PRODUTOS -------------')

    for(let i = 0; i < produtos.length; i++){ // esse loop ira ter o mesmo papel do loop de buscar clientes, ele percorre todo o array(produtos) mostrando os produtos cadastrados.
        const produtoBuscado = produtos[i]; // a variável "produtoBuscado" ira receber o valor da array "produtos"
        
        console.log(`Id: ${produtoBuscado.id} | Nome: ${produtoBuscado.nome} | Preço: ${produtoBuscado.preco.toFixed(2)}`);
        // aqui temos a exibição das informaçoes de todos os clientes cadastrados.
    }
    prompt('ENTER para continuar:')
}

//-Pedido

function realizarPedido(): void{
    let itensPedidos: ItemPedido[] = [];

    if(clientes.length === 0 || produtos.length === 0){
        console.log('ERRO: É necessário ter ao menos um cliente e um produto cadastrado!');
        prompt('ENTER para continuar...');
        return;
    }
    
    console.log('------------------- NOVO PEDIDO --------------------');
    buscarClientes();
    
    const idCliente = parseInt(prompt('Digite o Id do cliente: '));

    //inicio da busca do cliente.
    let clienteEncontrado: Cliente | undefined = undefined; // Crio uma "caixa" vazia para o cliente

    // o for abaixo percorre a lista "clientes" de uma ponta a outra, ou até encontar o valor do id do cliente solicitado 
    for (let i = 0; i < clientes.length; i++) {
        // se o Id do cliente solicitado for encontrado ele será colocado na variável
        if (clientes[i].id === idCliente) {
            clienteEncontrado = clientes[i]; 
            break; // o loop para pois o valor ja foi encontrado
        }
    }
    
    if (!clienteEncontrado) { // caso o cliente não exista, o console abaixo aparecera.
        console.log('Cliente com este ID não foi encontrado!');
        prompt('ENTER para continuar...');
        return;//  aqui é a função é parada
    }
    
    // varivel feita para controlar a duração do looping, enquanto seu valor for true, o looping será executado
    let adicionandoItens = true; 
    while(adicionandoItens){ // enquanto "adicionarItens" for true , todo o bloco será executado.
        console.clear();
        console.log(`CLIENTE: ${clienteEncontrado.nome}`);// clienteEncontrado.nome = o nome do cliente encontrado no laço for logo acima, que está dentro da lista "Cliente", será mostrado na tela.
        
    for (let i = 0; i < produtos.length; i++) {
        // A cada volta do loop, eu pego o produto que está na posição 'i' 
        const produtoDisponivel = produtos[i]; 
        
        // E mostro as informações desse produto específico
        console.log(`${produtoDisponivel.id} - ${produtoDisponivel.nome} (R$ ${produtoDisponivel.preco.toFixed(2)})`);
    }
    
        const idProduto = parseInt(prompt('Digite o Id do produto: '));

        //aqui começa a busca pelo produto
        let produtoEncontrado: Produto | undefined = undefined; // mais uma vez com a criação de uma variável vazia.

        for (let i = 0; i < produtos.length; i++) { //aqui o .lenth percorre toda a lista em busca do Id digitado.
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
    
        const quantidade = parseInt(prompt(`Quantidade de '${produtoEncontrado.nome}': `));// aqui é feita a solicitação da quantidade deo produto selecionado.
        if (quantidade <= 0 || isNaN(quantidade)) {// caso o valor digitado seja 0, letras, ou n seja digitado nada, o bloco abaixo será executado.
            console.log('Quantidade inválida. Adicione ao menos 1 item.');
            prompt('ENTER para continuar...');
            continue; // pula pra proxima volta do loop
        }
    
        itensPedidos.push({ produto: produtoEncontrado, quantidade: quantidade });// o .push vai trazer os dados coletado das variáveis "produtoEncontrado" e "quantidade" e armazenalos no array "itensPedido"
    
        const respostaUsuario = prompt('Deseja adicionar outro produto? (s/n): ');// a resposta do usuário é armazenada na constante "respostaUsuario"
        // Se a resposta do usuário não for 's', a variável de controle vira 'false'
        // e o loop 'while' irá parar na próxima verificação.
        if (respostaUsuario.toLowerCase() !== 's') { //se a resposta do usuário for diferente de s, então o looping será finalizado
        // .toLowerCase() é um método de formatação, onde tudo que o usuário digitar será convertido em letras minúsculas.
            adicionandoItens = false; 
        }   
    }

    console.log('\n--- Finalizando Pedido ---');

    // variável de valor total do pedido, tem valor 0 pois o programa ainda não foi iniado.
    let totalDoPedido = 0; 
    
    //percorro toda a variável "itensPedidos" e adiciono seus valores na variável itemAtual
    for (let i = 0; i < itensPedidos.length; i++) {
        const itemAtual = itensPedidos[i]; 
        const subtotalItem = itemAtual.produto.preco * itemAtual.quantidade; //subtotalItem recebe o itemAtual.produto.preco e é multiplicado a quantidade do item atual
        totalDoPedido = totalDoPedido + subtotalItem; //"totalDoPedido" vai receber seu valor mais o "subtotalItem"
        console.log(`- ${itemAtual.produto.nome} (x${itemAtual.quantidade}): R$ ${subtotalItem.toFixed(2)}`);// e aqui tudo é empresso na tela.
    }  
    
    //Essa parte do código é onde o cliente vai escolher sua forma de pagamento.
    console.log('----------Forma de Pagamento-------------')
    console.log('1 - Pix.')
    console.log('2 - Dinheiro')
    console.log('3 - Débito')
    console.log('4 - Crédito')
    
    let metodoPagamento = '' // declaro uma variável vazia para que o valor que ela ira receber, possa ser adicionado depois no switch.
    
    while(metodoPagamento === ''){
        const escolhaPagamento = prompt('Digite qual será a forma de pagamento (1-4): ')
        
        switch(escolhaPagamento) {
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
                console.log('Digite uma opção válida!') // e o loop continua, por que a variável "metodoPagamento" não teve seu valor altearado.
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
    
    console.log('---------------------------------');
    console.log(`TOTAL DO PEDIDO: R$ ${pedido.total.toFixed(2)}`); //toFixed(2) faz com que o preço tenha fixadamente 2 casas decimais.
    console.log(`FORMA DE PAGAMENTO: ${pedido.formaPagamento}`)
    console.log('\nPedido realizado com sucesso!');
    prompt('ENTER para voltar ao menu...');
}

//-MENU PRINCIPAL-

function menu(): void{

    let sair = false

    while (!sair){ // enquando sair NÂO for false, o while é executado

        console.clear();
        console.log("===== PIZZARIA  ====="); // e nesse while, é onde o usuário vai fazer todos os cadastros, as buscas, e pedido dos clientes
        console.log("1. Cadastrar cliente"); // basta ele digitar o número que representa o que ele quer fazer dentro do sistema.
        console.log("2. Buscar clientes");
        console.log("3. Cadastrar produto");
        console.log("4. Buscar produtos");
        console.log('5. Realizar um pedido')
        console.log("6. Sair");
        console.log("======================================");

        const escolha = prompt('Digite o número referente ao seu desejo: ')

        switch (escolha){
            case '1': 
                cadastrodeClientes(); break; // quando o valor digitado no prompt acima pertencer a algum case, o respectivo case...
            case '2': 
                buscarClientes(); break; // chamará a função que está linkada nele
            case '3': 
                cadastrodeProduto(); break;
            case '4': 
                buscarProdutos(); break;
            case '5': 
                realizarPedido(); break;
            case '6':
                console.log("Obrigado por usar o sistema!");
                sair = true; // o programa deixa de ser executado.
                break;
            default: // caso o usuário não digite nenhum valor existente no case, a mensagem abaixo é executada.
                console.log("Opção inválida!");
                prompt("Pressione Enter para continuar...");
                break;
        }
    }
}



// Inicia o programa
menu()
