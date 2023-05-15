
const Database = require('better-sqlite3');
//aqui se guardan los datos
const db = new Database('bot.db');
//permite acceder a la base de datos desde cualquier documento
module.exports = db;
