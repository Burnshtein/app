const db = require('../utils/database/sqLite');
const User = require('../models/User');

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      if (!row) resolve(null);
      else resolve(new User(row.id, row.email, row.username, row.password));
    });
  });
};

const create = (email, username, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
      [email, username, password],
      function(err) {
        if (err) reject(err);
        resolve(new User(this.lastID, email, username, password));
      }
    );
  });
};

module.exports = { findByEmail, create };