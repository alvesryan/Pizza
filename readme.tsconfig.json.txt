📄 Desvendando o tsconfig.json
Este arquivo é o coração de um projeto TypeScript. Ele funciona como um manual de instruções para o compilador (tsc), dizendo a ele exatamente como pegar seus arquivos .ts e transformá-los em arquivos .js que o Node.js ou o navegador possam entender.

Abaixo, vamos detalhar cada uma das configurações presentes neste projeto.

compilerOptions
Esta é a seção principal, onde definimos o comportamento do compilador.

  "compilerOptions": { ... }

"target": "ES2020"

O que faz? Define a versão do JavaScript que será gerada. ES2020 é uma versão moderna do JavaScript. Isso significa que o TypeScript irá converter seu código para um JavaScript que utiliza recursos lançados até o ano de 2020, que é compatível com as versões mais recentes do Node.js e navegadores.

"module": "commonjs"

O que faz? Especifica o sistema de módulos que o JavaScript gerado usará. commonjs é o sistema de módulos padrão do Node.js (aquele que usa require e module.exports).

"outDir": "./dist"

O que faz? Informa ao compilador para colocar todos os arquivos JavaScript resultantes dentro de uma pasta chamada dist (abreviação de "distribuição"). Isso mantém o projeto organizado, separando o código-fonte do código compilado.

"rootDir": "./src"

O que faz? Define que a pasta src (abreviação de "source" ou "fonte") é o diretório raiz do seu código TypeScript. O compilador usará essa informação para replicar a estrutura de pastas de src dentro de dist.

"strict": true

O que faz? Esta é uma configuração de segurança muito importante. Ao ativá-la, você liga um conjunto de regras mais rígidas de verificação de tipos, o que ajuda a evitar erros comuns, como usar uma variável que pode ser null ou undefined sem antes verificar.

"esModuleInterop": true

O que faz? Melhora a compatibilidade entre os dois principais sistemas de módulos do JavaScript (CommonJS e ES Modules). Na prática, permite que você importe bibliotecas que usam require com a sintaxe import, tornando o código mais consistente.

"skipLibCheck": true

O que faz? Diz ao TypeScript para não verificar os tipos de todas as bibliotecas de terceiros (as que ficam na pasta node_modules). Isso acelera significativamente o tempo de compilação, já que ele confia que os tipos dessas bibliotecas estão corretos.

"forceConsistentCasingInFileNames": true

O que faz? Garante que você não possa importar o mesmo arquivo de duas maneiras diferentes (ex: import './arquivo' e import './Arquivo'). Isso evita problemas, principalmente em sistemas operacionais que não diferenciam maiúsculas de minúsculas.

include
Esta seção diz ao compilador quais arquivos ele deve analisar e compilar.

  "include": [
    "src/**/*",
    "dist/index.js"
  ]

"src/**/*"

O que faz? É um padrão que significa: "inclua todos os arquivos (*) de todas as subpastas (**) dentro do diretório src". É a configuração padrão e correta para compilar todo o seu código-fonte.

"dist/index.js"

O que faz? Esta linha instrui o compilador a incluir também o arquivo dist/index.js no processo de compilação.
