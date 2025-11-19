# 🍕 Sistema de Gestão para Pizzaria (Fullstack Web)

Sistema completo para pizzarias, composto por uma **API REST (Backend)** e duas interfaces **Web (Frontend)**: um Painel Administrativo com Dashboards e um Totem de Autoatendimento para clientes.

Este projeto evoluiu de um CLI (linha de comando) para uma arquitetura moderna de **3 Camadas**, utilizando **PostgreSQL** no Docker, **Express** para o servidor e **Prisma ORM**.

## ✨ Recursos

### 🖥️ Painel Administrativo (Gestão)
* **Dashboard Financeiro:** Gráficos interativos (Chart.js) e cards com vendas do dia e do mês em tempo real.
* **Gestão Completa:** Cadastro e listagem de Clientes e Produtos (Cardápio).
* **Controle de Pedidos:** Visualização detalhada dos pedidos realizados no dia.
* **Segurança:** Tela de login para acesso restrito (`admin`).

### 📱 Totem de Autoatendimento (Cliente)
* **Interface Visual:** O cliente visualiza os produtos como "Cards" com preço e nome.
* **Carrinho de Compras:** Adição dinâmica de itens e cálculo automático do total.
* **Fluxo Independente:** O cliente se identifica, escolhe e finaliza o pedido sozinho.

### ⚙️ Backend & Banco de Dados
* **API REST:** Servidor Express servindo rotas JSON para os frontends.
* **Arquivos Estáticos:** O próprio servidor Node.js entrega os arquivos HTML (pasta `public`).
* **Persistência:** Dados salvos no PostgreSQL rodando em Container Docker.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Fetch API), Chart.js.
* **Backend:** Node.js, TypeScript, Express.
* **Banco de Dados:** PostgreSQL.
* **ORM:** Prisma.
* **Infraestrutura:** Docker.

---

## 📁 Estrutura do Projeto

```text
├── prisma/              
│   └── schema.prisma    # Configuração do Banco e Tabelas
├── public/              # ARQUIVOS DO SITE (Frontend)
│   ├── index.html       # Painel Administrativo (Admin)
│   └── cliente.html     # Totem de Autoatendimento
├── src/                     
│   ├── services/        # Lógica de Banco de Dados (CRUD)
│   ├── types/           # Interfaces TypeScript
│   └── index.ts         # Servidor API (Express) + Arquivos Estáticos
├── .env                 # Configuração do Banco
├── package.json
└── tsconfig.json

🚀 Instalação e Configuração
1. Pré-requisitos
Node.js v18 ou superior.

Docker instalado e rodando.

Git.

2. Clone o repositório
Bash

git clone [https://github.com/alvesryan/Pizza.git](https://github.com/alvesryan/Pizza.git)
cd Pizza
3. Instale as dependências
Bash

npm install
4. Suba o Banco de Dados (Docker)
Execute este comando para criar o container do PostgreSQL:

Bash

docker run --name meu-postgres -e POSTGRES_PASSWORD=caiogado -e POSTGRES_USER=admin -e POSTGRES_DB=db_pizzaria -p 5432:5432 -d postgres
5. Configure o Ambiente
Crie um arquivo .env na raiz e cole a conexão:

Snippet de código

DATABASE_URL="postgresql://admin:caiogado@localhost:5432/db_pizzaria?schema=public"
6. Crie as Tabelas
Bash

npx prisma migrate dev --name init
7. (Opcional) Popular o Banco
Se quiser gerar dados de teste (vendas passadas para o gráfico):

Bash

npm run seed
▶️ Como Executar
Basta rodar um único comando. O servidor iniciará a API e servirá o site automaticamente.

1. Inicie o Servidor
No terminal, execute:

Bash

npm run dev
2. Acesse no Navegador
Painel Admin: http://localhost:3000

Login: admin

Senha: 123456

Totem Cliente: http://localhost:3000/app

📝 Rotas da API (Para Desenvolvedores)
O backend roda em http://localhost:3000 e disponibiliza:

GET /clientes - Lista todos os clientes.

POST /clientes - Cadastra novo cliente.

GET /produtos - Lista o cardápio.

POST /produtos - Cadastra novo produto.

GET /pedidos - Histórico de vendas.

POST /pedidos - Processa uma nova venda.

POST /login - Autenticação do admin.