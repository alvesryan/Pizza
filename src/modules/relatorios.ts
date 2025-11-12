// src/modules/relatorio.module.ts
import { askQuestion } from "../utils/cli";
import { pedidos } from "../services/storage.service";

// Função auxiliar para verificar se duas datas são no mesmo dia
function isMesmoDia(date1: Date, date2: Date): boolean {
    
    // Se date1 (pedido.dataCriacao) for 'undefined' ou uma 'Data Inválida'
    // (de um pedido antigo do CSV), retorna 'false' e não tenta ler 'getFullYear'.
  if (!date1 || isNaN(date1.getTime())) {
    return false;
  }
  
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export async function mostrarRelatorios(): Promise<void> {
  console.clear();
  console.log("------- RELATÓRIO DE PEDIDOS -------");

  const hoje = new Date();

  // 1. Calcular Pedidos do Dia
  // Filtramos a lista de pedidos, mantendo apenas aqueles cuja data é o mesmo dia que 'hoje'
  const pedidosDoDia = pedidos.filter((pedido) =>
    isMesmoDia(pedido.dataCriacao, hoje)
  ).length; // .length nos dá o número total

  // 2. Calcular Pedidos do Mês
  // Filtramos mantendo apenas os pedidos do mesmo mês E do mesmo ano
  // Adicionamos a mesma checagem de segurança aqui
  const pedidosDoMes = pedidos.filter(
    (pedido) => {
      // Checagem de segurança para datas indefinidas ou inválidas
      if (!pedido.dataCriacao || isNaN(pedido.dataCriacao.getTime())) {
        return false;
      }
      
      // Se a data for válida, faz a comparação
      return (
        pedido.dataCriacao.getMonth() === hoje.getMonth() &&
        pedido.dataCriacao.getFullYear() === hoje.getFullYear()
      );
    }
  ).length;

  console.log(`\nPedidos realizados HOJE: ${pedidosDoDia}`);
  console.log(`Pedidos realizados este MÊS: ${pedidosDoMes}`);
  console.log("\n------------------------------------");

  await askQuestion("Pressione ENTER para voltar ao menu...");
}