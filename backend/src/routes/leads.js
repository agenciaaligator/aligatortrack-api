const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

/**
 * Rota para registrar um novo lead. Recebe o ID do formulário, ID
 * do cliente e os dados do lead. Salva no banco e retorna o
 * identificador e um link de WhatsApp genérico. Em produção,
 * deverá gerar uma URL com os parâmetros corretos e mensagem
 * pré-formatada.
 */
router.post('/', async (req, res) => {
  const { formularioId, clienteId, dados } = req.body;
  if (!formularioId || !clienteId || !dados) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO Leads (formulario_id, cliente_id, dados_json, status, criado_em) VALUES (?, ?, ?, ?, NOW())',
      [formularioId, clienteId, JSON.stringify(dados), 'novo']
    );
    const leadId = result.insertId;
    // Cria URL básica. Substituir com lógica de template de mensagem.
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${dados.telefone}&text=Olá%20${encodeURIComponent(dados.nome)}`;
    return res.status(201).json({ leadId, whatsappUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao registrar lead' });
  }
});

/**
 * Lista leads do cliente autenticado. Pode ser filtrado no futuro
 * com parâmetros de query (status, data, etc.).
 */
router.get('/', auth, async (req, res) => {
  const { cliente_id } = req.user;
  try {
    const [rows] = await pool.query(
      'SELECT id, dados_json, status, origem, criado_em FROM Leads WHERE cliente_id = ? ORDER BY criado_em DESC LIMIT 100',
      [cliente_id]
    );
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao listar leads' });
  }
});

/**
 * Atualiza o status de um lead. Somente clientes autenticados
 * podem alterar seus próprios leads.
 */
router.patch('/:id/status', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Status obrigatório' });
  }
  try {
    await pool.query('UPDATE Leads SET status = ? WHERE id = ?', [status, id]);
    return res.json({ message: 'Status atualizado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao atualizar status' });
  }
});

module.exports = router;