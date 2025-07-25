# Backend AligatorTrack

Este diretório contém o código da API do **AligatorTrack**. A aplicação foi construída com
**Node.js** e **Express**, e utiliza um banco de dados **MySQL** para armazenar
informações sobre usuários, formulários e leads.

## Pré‑requisitos

- Node.js 18+ instalado na máquina
- Banco de dados MySQL configurado com as tabelas descritas no relatório de
  arquitetura
- Variáveis de ambiente configuradas (veja `.env.example`)

## Instalando Dependências

> **Observação:** este repositório contém apenas a estrutura inicial; as
> dependências listadas em `package.json` precisam ser instaladas com `npm`
> ou `yarn` antes de executar o servidor.

```bash
cd aligatortrack_mvp/backend
npm install
```

## Executando em Desenvolvimento

Crie um arquivo `.env` com base no `.env.example` e ajuste as variáveis de
ambiente conforme seu ambiente local. Em seguida execute:

```bash
npm run dev
```

O servidor será iniciado na porta definida em `PORT` (padrão 3001) e
exporá as rotas:

- `POST /auth/login` – autenticação
- `POST /leads` – criação de leads
- `GET /leads` – listagem de leads (token obrigatório)
- `PATCH /leads/:id/status` – atualização de status do lead (token obrigatório)
- `GET /forms/:id` – leitura de formulários
- `POST /forms` – criação de formulários (admin somente)

## Estrutura de Arquivos

- `src/server.js` – ponto de entrada do servidor Express
- `src/db.js` – conexão com MySQL
- `src/middleware/authMiddleware.js` – middleware de autenticação via JWT
- `src/routes/` – rotas agrupadas em arquivos (auth, leads, forms)

Sinta‑se à vontade para expandir as rotas e adicionar novos módulos conforme a
necessidade do projeto.