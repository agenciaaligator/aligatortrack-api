const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();

/*
 * Cria um pool de conexões com MySQL. Essa abordagem permite
 * reuso de conexões e melhor performance ao executar múltiplas
 * queries simultâneas. Os valores são lidos a partir do arquivo
 * .env fornecido pelo usuário.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;