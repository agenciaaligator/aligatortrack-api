const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');
const formRoutes = require('./routes/forms');

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Rotas da aplicação
app.use('/auth', authRoutes);
app.use('/leads', leadRoutes);
app.use('/forms', formRoutes);

// Rota raiz apenas para status
app.get('/', (req, res) => {
  res.json({ message: 'AligatorTrack API' });
});

// Inicializa servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});