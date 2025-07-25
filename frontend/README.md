# Frontend AligatorTrack

Este diretório abriga a aplicação **React** utilizada pelo AligatorTrack.
Ela utiliza o bundler **Vite** para desenvolvimento rápido e **Tailwind CSS**
para estilização. O objetivo desta interface é fornecer formulários de
captação de leads, painéis de métricas e um ambiente amigável para os
administradores da plataforma.

## Pré‑requisitos

- Node.js 18+ instalado

## Instalação

Execute os seguintes comandos para instalar as dependências:

```bash
cd aligatortrack_mvp/frontend
npm install
```

## Executando em Desenvolvimento

Após instalar as dependências, execute:

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento (por padrão na porta 5173) e
abrirá a aplicação no navegador. Qualquer modificação nos arquivos
`src/` recarregará a página automaticamente.

## Estrutura de Pastas

- `index.html` – documento HTML principal que injeta o React
- `src/main.jsx` – ponto de entrada da aplicação
- `src/App.jsx` – define as rotas principais usando React Router
- `src/pages/` – páginas da aplicação (Login, Dashboard, LeadForm)
- `src/index.css` – arquivo base com importações do Tailwind
- `tailwind.config.js` / `postcss.config.js` – configurações para Tailwind e PostCSS

## Próximos Passos

Esta estrutura é um ponto de partida. Será necessário adicionar:

- Integração com a API (configurar base URL no `fetch`)
- Autenticação e armazenamento de tokens (context API ou Redux)
- Componentes para gráficos e tabelas (por exemplo, Chart.js)
- Estilos personalizados utilizando as cores definidas no design system

Contribua e adapte conforme evoluírem os requisitos do projeto.