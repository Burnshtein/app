// api/controllers/productController.js
const productUseCases = require('../../useCases/productUseCases');

const getProducts = async (req, res) => {
  try {
    const products = await productUseCases.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productUseCases.getProductById(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { getProducts, getProductById };