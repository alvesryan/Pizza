"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rl = void 0;
exports.askQuestion = askQuestion;
// src/utils/cli.ts
var readline = require("readline"); // Essa linha permite que o usuário interaja com o programa. podendo digitar na tela.
exports.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askQuestion(query) {
    return new Promise(function (resolve) { return exports.rl.question(query, resolve); });
}
