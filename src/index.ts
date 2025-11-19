// Importa a lógica de CLI
import { rl, askQuestion } from "./utils/cli";

// Importa os módulos de cada entidade
import {
  cadastrodeClientes,
  buscarClientes,
} from "./modules/cliente";
import {
  cadastrodeProduto,
  buscarProdutos,
} from "./modules/produto";
import { realizarPedido } from "./modules/pedido";
import { mostrarRelatorios } from "./modules/relatorios";

//-MENU PRINCIPAL-

async function menu(): Promise<void> {
  let sair = false;

  while (!sair) {
    // enquando sair NÂO for false, o while é executado

    console.clear();
    console.log("===== PIZZARIA (Conectada ao BD) ====="); // e nesse while, é onde o usuário vai fazer todos os cadastros, as buscas, e pedido dos clientes
    console.log("1. Cadastrar cliente"); // basta ele digitar o número que representa o que ele quer fazer dentro do sistema.
    console.log("2. Listar clientes");
    console.log("3. Cadastrar produto");
    console.log("4. Listar produtos");
    console.log("5. Realizar um pedido");
    console.log("6. Ver relatórios");
    console.log("7. Sair");
    console.log("======================================");

    const escolha = await askQuestion(
      "Digite o número referente ao seu desejo: "
    );

    switch (escolha) {
      case "1":
        await cadastrodeClientes();
        break; // quando o valor digitado no prompt acima pertencer a algum case, o respectivo case...
      case "2":
        await buscarClientes(); // chamará a função que está linkada nele
        break;
      case "3":
        await cadastrodeProduto();
        break;
      case "4":
        await buscarProdutos();
        break;
      case "5":
        await realizarPedido();
        break;
      case "6":
        await mostrarRelatorios();
        break;
      case "7":
        console.log("Até logo!!");
        sair = true; // sair vira true e o programa é finalizado.
        break;
      default: // caso o usuário não digite nenhum valor existente no case, a mensagem abaixo é executada.
        console.log("Opção inválida!");
        await askQuestion("Pressione Enter para continuar...");
        break;
    }
  }
  rl.close();
}
// Inicia o programa
menu();