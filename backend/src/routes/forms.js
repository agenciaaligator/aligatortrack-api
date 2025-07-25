const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

/**
 * Retorna configuração JSON do formulário pelo ID. Essa rota
 * normalmente é pública, pois os leads acessam sem estar
 * autenticados. No entanto, ela valida se o formulário existe.
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT nome, config_json FROM Formularios WHERE id = ? AND ativo = 1', [id]);
    const form = rows[0];
    if (!form) {
      return res.status(404).json({ message: 'Formulário não encontrado' });
    }
    const config = JSON.parse(form.config_json);
    // Inclui o nome do formulário para exibir no cabeçalho
    return res.json({ nome: form.nome, ...config });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao recuperar formulário' });
  }
});

/**
 * Cria um novo formulário. Somente administradores podem
 * utilizar esta rota. Recebe o ID do cliente, nome do
 * formulário e um objeto de configuração.
 */
router.post('/', auth, async (req, res) => {
  const { funcao } = req.user;
  if (funcao !== 'admin') {
    return res.status(403).json({ message: 'Permissão negada' });
  }
  const { clienteId, nome, config } = req.body;
  if (!clienteId || !nome || !config) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }
  try {
    await pool.query(
      'INSERT INTO Formularios (cliente_id, nome, config_json, ativo, criado_em) VALUES (?, ?, ?, ?, NOW())',
      [clienteId, nome, JSON.stringify(config), 1]
    );
    return res.status(201).json({ message: 'Formulário criado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao criar formulário' });
  }
});

module.exports = router;