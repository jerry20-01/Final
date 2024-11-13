// models/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Crear tabla de solicitudes si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS solicitudes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      area TEXT,
      requerimiento TEXT,
      fecha TEXT,
      numero_atencion TEXT,
      estado TEXT DEFAULT 'pendiente',
      fecha_aceptado TEXT,
      fecha_cerrado TEXT
    )
  `);
});

module.exports = db;



