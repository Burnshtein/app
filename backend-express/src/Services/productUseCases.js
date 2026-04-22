// useCases/productUseCases.js
const productRepository = require('../../domain/repositories/productRepository');

const getProducts = async () => {
  return await productRepository.findAll();
};

const getProductById = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw new Error('Product not found');
  return product;
};

module.exports = { getProducts, getProductById };