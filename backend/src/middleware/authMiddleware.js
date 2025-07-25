const jwt = require('jsonwebtoken');

/**
 * Middleware para proteger rotas autenticadas. Espera que o
 * cabeçalho Authorization contenha um token no formato
 * "Bearer <token>". Se o token for válido, adiciona o
 * usuário decodificado ao objeto `req`.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token ausente' });
  }
  const [, token] = authHeader.split(' ');
  if (!token) {
    return res.status(401).json({ message: 'Token ausente' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;