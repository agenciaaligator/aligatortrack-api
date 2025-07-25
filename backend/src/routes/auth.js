const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');

/**
 * Endpoint de login. Recebe email e senha, verifica usuário no
 * banco de dados e retorna um JWT caso as credenciais sejam
 * válidas. Retorna 401 em caso de erro de autenticação.
 */
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [rows] = await pool.query('SELECT id, nome, funcao, senha_hash, cliente_id FROM Usuarios WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    const match = await bcrypt.compare(senha, user.senha_hash);
    if (!match) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
    const token = jwt.sign(
      {
        id: user.id,
        nome: user.nome,
        funcao: user.funcao,
        cliente_id: user.cliente_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '6h' }
    );
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao autenticar' });
  }
});

module.exports = router;