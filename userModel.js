const connection = require('../database');

const User = {
  create: (username, email, password, callback) => {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], callback);
  },
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], callback);
  },
};

module.exports = User;