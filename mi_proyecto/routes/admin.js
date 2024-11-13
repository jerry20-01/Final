// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Middleware de autenticación
router.use((req, res, next) => {
  const { usuario, contraseña } = req.query;
  if (usuario === 'admin' && contraseña === 'admin123') {
    next();
  } else {
    res.send('Acceso denegado.');
  }
});

// Mostrar solicitudes pendientes
router.get('/', (req, res) => {
  db.all("SELECT * FROM solicitudes WHERE estado = 'pendiente'", (err, solicitudes) => {
    if (err) return console.error(err);
    res.render('admin', { solicitudes });
  });
});

// Aceptar solicitud
router.post('/aceptar', (req, res) => {
  const { id, nombre } = req.body;
  const fecha_aceptado = new Date().toISOString();
  db.run(`UPDATE solicitudes SET estado = 'aceptado', fecha_aceptado = ?, nombre_aceptado_por = ? WHERE id = ?`,
    [fecha_aceptado, nombre, id], (err) => {
      if (err) return console.error(err);
      res.redirect('/admin');
    });
});

// Cerrar solicitud
router.post('/cerrar', (req, res) => {
  const { id, nombre } = req.body;
  const fecha_cerrado = new Date().toISOString();
  db.run(`UPDATE solicitudes SET estado = 'cerrado', fecha_cerrado = ?, nombre_cerrado_por = ? WHERE id = ?`,
    [fecha_cerrado, nombre, id], (err) => {
      if (err) return console.error(err);
      res.redirect('/admin');
    });
});

module.exports = router;



