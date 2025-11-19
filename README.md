# 🍕 Sistema de Gestão para Pizzaria (TypeScript + Node.js + PostgreSQL)

Aplicativo CLI (linha de comando) para gerenciar Clientes, Produtos e Pedidos de uma pizzaria. 

Este projeto foi migrado de um sistema de arquivos simples (CSV) para uma arquitetura robusta utilizando **Banco de Dados Relacional (PostgreSQL)** rodando em **Docker**, gerenciado pelo **Prisma ORM**. É um excelente exemplo de modernização de legado e integração de Backend com Banco de Dados.

## ✨ Recursos

* **Gestão de Clientes:** Cadastra nome e contato, salvando diretamente no banco de dados.
* **Gestão de Produtos:** Cadastra itens do cardápio com preço.
* **Realização de Pedidos:** * Vincula clientes e produtos existentes no banco.
    * Calcula totais automaticamente.
    * Gera um **ID único** automático para cada pedido.
* **Persistência Profissional:** Todos os dados são salvos instantaneamente no PostgreSQL. Nada é perdido se o programa fechar.
* **Notas Fiscais:** Gera automaticamente um arquivo `.txt` na pasta `notas_fiscais/` com os detalhes de cada pedido realizado.
* **Relatórios:** Consulta em tempo real de vendas do dia e do mês.

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** TypeScript / Node.js
* **Banco de Dados:** PostgreSQL
* **Infraestrutura:** Docker (Container)
* **ORM:** Prisma (para modelagem e queries)
* **Interface:** CLI (Command Line Interface)

## 📁 Estrutura de Pastas

```text
├── dist/                # Código compilado (JS)
├── node_modules/        # Dependências do projeto
├── notas_fiscais/       # Arquivos TXT gerados pelos pedidos
├── prisma/              
│   └── schema.prisma    # Configuração do Banco e Tabelas
├── src/                     
│   ├── modules/         # Lógica de negócio (Cliente, Produto, Pedido)
│   ├── services/        # Conexão com o Banco (Prisma Client)
│   ├── types/           # Interfaces e Tipos TypeScript
│   └── index.ts         # Menu principal e entrada do sistema
├── .env                 # Variáveis de ambiente (Configuração do Banco)
├── package.json
└── tsconfig.json

* **Pré-requisitos**
Node.js v18 ou superior.

Docker e Docker Desktop instalados e rodando.

Git para versionamento.

🚀 Instalação e Configuração
Siga este passo a passo para rodar o projeto na sua máquina:

1. Clone o repositório
Bash

git clone [https://github.com/alvesryan/Pizza.git](https://github.com/alvesryan/Pizza.git)
cd Pizza
2. Instale as dependências
Bash

npm install
3. Suba o Banco de Dados (Docker)
Execute o comando abaixo para criar o container do PostgreSQL:

Bash

docker run --name meu-postgres -e POSTGRES_PASSWORD=caiogado -e POSTGRES_USER=admin -e POSTGRES_DB=db_pizzaria -p 5432:5432 -d postgres
Isso vai baixar a imagem do Postgres e rodar na porta 5432.

4. Configure as Variáveis de Ambiente
Crie um arquivo chamado .env na raiz do projeto e cole a conexão:

Snippet de código

DATABASE_URL="postgresql://admin:caiogado@localhost:5432/db_pizzaria?schema=public"

5. Crie as Tabelas (Prisma Migrate)
Agora vamos pedir para o Prisma criar as tabelas no banco vazio:

Bash

  npx prisma migrate dev --name init
  Se aparecer "Your database is now in sync", deu tudo certo!

▶️ Como Executar
Modo Desenvolvimento (Recomendado)
Para rodar diretamente com TypeScript (sem precisar compilar toda hora):

Bash

npm run dev
Modo Produção
Para compilar para JavaScript e rodar a versão final:

Bash

npm run build
npm run start
🖥️ Uso (Menu Interativo)

**OBS** Se a sua versão do node.js for muito desatualizada em relação ao Prisma, você pode ter complicações pra rodar a aplicação.


Ao iniciar, o sistema conecta ao banco e apresenta o menu:

Cadastrar cliente: Insere um novo cliente no banco.

Listar clientes: Busca todos os registros da tabela Cliente.

Cadastrar produto: Insere um novo item na tabela Produto.

Listar produtos: Mostra o cardápio atualizado.

Realizar um pedido: Cria uma transação que salva o Pedido e os Itens do Pedido no banco.

Ver relatórios: Mostra estatísticas de vendas baseadas nas datas salvas no banco.

Sair: Encerra a aplicação (os dados já estão salvos no PostgreSQL).

📝 Campos e Formatos
IDs: Int (Gerado automaticamente pelo banco - Autoincrement).

Preço/Total: Float (Decimal).

Contato: String (Aceita formatação, ex: "(11) 99999-9999").

Forma de Pagamento: String.

Datas: DateTime (Geradas automaticamente pelo banco no momento do cadastro).