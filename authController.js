const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar nuevo usuario
exports.register = (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    User.create(username, email, hashedPassword, (err, result) => {
      if (err) throw err;
      res.redirect('/auth/login');
    });
  });
};

// Iniciar sesión
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, user) => {
    if (err) throw err;
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      res.cookie('auth_token', token);
      res.redirect('/bots');
    } else {
      res.send('Email or password incorrect');
    }
  });
};