const sqlite3=
require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fio TEXT,
    email TEXT UNIQUE,
    login TEXT,
    password TEXT,
    isVerified INTEGER DEFAULT 0
)
    `);
    module.exports = db;