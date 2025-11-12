// src/utils/cli.ts
import * as readline from "readline"; // Essa linha permite que o usuário interaja com o programa. podendo digitar na tela.

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}