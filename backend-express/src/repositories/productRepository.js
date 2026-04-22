// domain/repositories/productRepository.js
const db = require('../Utils/database/sqLite');
const Product = require('../models/Product');

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', (err, rows) => {
      if (err) reject(err);
      resolve(rows.map(row => new Product(row.id, row.title, row.price, row.description, row.image)));
    });
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      if (!row) resolve(null);
      else resolve(new Product(row.id, row.title, row.price, row.description, row.image));
    });
  });
};

module.exports = { findAll, findById };