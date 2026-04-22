// seed.js
const db = require('./infrastructure/database/sqLite');

const products = [
  { title: 'Ноутбук', price: 45000, description: 'Мощный ноутбук', image: null },
  { title: 'Смартфон', price: 25000, description: 'Современный смартфон', image: null },
  { title: 'Наушники', price: 5000, description: 'Беспроводные наушники', image: null },
];

products.forEach(p => {
  db.run('INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)',
    [p.title, p.price, p.description, p.image]);
});

console.log('Товары добавлены');