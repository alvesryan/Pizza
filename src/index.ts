import promptSync from 'prompt-sync';

const prompt = promptSync();

    let clientes: Cliente[] = []//Criação de array de clientes vazia.
    let produtos: Produto[] = []// Criação de array de produtos vazia.

    interface Cliente{
        id: number;
        nome: string;
        contato: number;
    }

    interface Produto{
        id: number;
        nome: string;
        preco: number;
    }
    
    //-------------------------- CADASTRO DE CLIENTE -----------------------

    function cadastrodeClientes(): void {  // o void significa que a função não ira retornar nenhum valor.
        console.clear()
        console.log('-------- CADASTRO DE CLIENTES -------')
        const nomeCliente = prompt('Nome do cliente :')
        const contatoCliente = parseInt(prompt('Número de contato do cliente: '))
        const clienteId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1; // Este código analisa a array "clientes" e verifica se ela está vazia, se sim, o novo cliente vai receber o primeiro Id, se não, o novo cliente vai receber o ultimo array + 1;

        const cadastroCliente: Cliente = {
            id : clienteId,
            nome: nomeCliente,
            contato: contatoCliente
        };

        clientes.push(cadastroCliente) // O método .push, pega a variável que foi passada pra ele, que é o ultimo cliente cadastrado, e o adiciona ao final da array.

        console.log(`\nCliente '${cadastroCliente.nome}' cadastrado com sucesso!`)
        prompt('ENTER para continuar')
    }

    // ---------------------------- BUSCADOR DE CLIENTE -----------------------------
    function buscarClientes(): void{
        console.clear()
        console.log('------ BUSCAR CLIENTES ------')
        if(clientes.length === 0){
            console.log('Não á clientes cadastrados até o momento!')
        } else{
            clientes.forEach(cliente => { // O método .forEach, é a forma como se percorre a array clientes, é usado para listar os items dentro da arrey
            // O cliente => vai ser o nome dado para o objeto, temporariamente.
                console.log(`Id: ${cliente.id} | Nome: ${cliente.nome} | Contato: ${cliente.contato}`)
            });
        }
        prompt('ENTER para continuar:')
    }

    //------------------ CADASTRO DE PRODUTO ----------------------
    function cadastrodeProduto(): void{
        console.clear()
        console.log('----------- CADASTRO DE PRODUTOS ------------')
        const nomeProduto = prompt('Nome do produto:')
        const precoProduto = parseFloat(prompt('Preço do produto'))
        const produtoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1; // Esse trecho funciona exatamente igual como trecho do cadastro de clientes, mas ao invés de dar um ID á um cliente, ele entrega para um produto.

        const cadastroProduto: Produto = {
            id: produtoId,
            nome: nomeProduto,
            preco: precoProduto,
        };

        produtos.push(cadastroProduto) // O método .push, pega a variável que foi passada pra ele, que é o ultimo produto cadastrado, e o adiciona ao final da array.

        console.log(`\nProduto '${cadastroProduto.nome}' cadastrado com sucesso!`)

        prompt('ENTER para continuar')

    }

    //-------------------BUSCARDOR DE PRODUTOS =----------------------
    function buscarProdutos(): void{
        console.clear()
        console.log('------------ BUSCADOR DE PRODUTOS -------------')
        if(produtos.length === 0){
            console.log('Nenhum produto cadastrado até o momento!')
        } else {
            produtos.forEach(produto => { // produto => é como o objeto produtos vai ser chamado temporariamente.
            console.log(`Id: ${produto.id} | Nome: ${produto.nome} | Contato: ${produto.preco}`)
            })
        }
        prompt('ENTER para continuar:')
    }

    //---------------MENU PRINCIPAL-------------------
    function menu(): void{ // função do menu principál do programa, esse vai ser o primeiro contato do usuário com o programa.
        let sair = false // Essa é a variável que vai fazer com que o "while" continue no seu looping

         while (!sair){ // !sair significa que o looping vai funcionar até que a variavel "sair" seja false.
            console.clear();
            console.log("===== PIZZARIA  ====="); //O usuário deve escolher a opção que ele deseja através do número que a representa.
            console.log("1. Cadastrar Cliente");
            console.log("2. Buscar Clientes");
            console.log("3. Cadastrar Produto");
            console.log("4. Buscar Produtos");
            console.log("5. Sair");
            console.log("======================================");

            const escolha = prompt('Digite o número referente o seu desejo: ')

        switch (escolha){
            case '1': cadastrodeClientes(); break; // Caso o número digitado pelo usuário esteja em algum case, ele chamará sua respectiva função.
            case '2': buscarClientes(); break;
            case '3': cadastrodeProduto(); break;
            case '4': buscarProdutos(); break;
            case '5':
                console.log("Obrigado por usar o sistema!");
                sair = true;
                break;
            default: // Caso o número digitado não seja encontrado em nenhum case, o usuário recebe a mensagem abaixo.
                console.log("Opção inválida!");
                prompt("Pressione Enter para continuar...");
                break;
        }
    }
}
// Aqui é onde o programa se inicia.
menu()