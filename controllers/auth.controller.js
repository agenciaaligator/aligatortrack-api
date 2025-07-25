
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // ajuste o caminho se necessário

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verifica se o usuário existe
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      // Compara a senha fornecida com o hash no banco
      const senhaValida = await bcrypt.compare(password, usuario.senha_hash);

      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      // Cria o token JWT
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          nome: usuario.nome,
          funcao: usuario.funcao
        },
        process.env.JWT_SECRET, // definida nas variáveis de ambiente
        { expiresIn: '1d' }
      );

      // Retorna o token e dados básicos do usuário
      return res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          funcao: usuario.funcao
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro ao autenticar' });
    }
  }
};
