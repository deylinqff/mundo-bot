const express = require('express');
const router = express.Router();

// Controlador para mostrar los bots disponibles
router.get('/', (req, res) => {
  res.render('dashboard'); // Vista del panel del usuario
});

router.get('/select', (req, res) => {
  res.render('selectBot'); // Vista donde se elige un bot
});

module.exports = router;