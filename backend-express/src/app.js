// src/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./api/routes/authRoutes');
const productRoutes = require('./api/routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

module.exports = app;