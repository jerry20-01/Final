// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('./database.db');

// Ruta principal para mostrar la interfaz de usuario
app.get('/', (req, res) => {
  res.render('index');
});

// Guardar solicitud en la base de datos
app.post('/submit', (req, res) => {
  const { nombre, area, requerimiento } = req.body;
  const fecha = new Date().toISOString();
  const numeroAtencion = Math.floor(Math.random() * 1000000);

  db.run('INSERT INTO solicitudes (nombre, area, requerimiento, fecha, numero_atencion) VALUES (?, ?, ?, ?, ?)',
    [nombre, area, requerimiento, fecha, numeroAtencion], (err) => {
      if (err) return console.log(err);
      res.redirect('/');
    });
});

// Rutas del administrador
app.use('/admin', require('./routes/admin'));

// Servidor escuchando en el puerto asignado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



