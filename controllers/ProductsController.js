/* eslint-disable camelcase */
const { ProductsService } = require('../services');

module.exports = {
  getAll: async (req, res) => {
    try {
      const products = await ProductsService.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getProductsByCategory: async (req, res) => {
    const { category } = req.params;
    try {
      const products = await ProductsService.getProductsByCategory(category);
      if (!products) return res.status(404).json({ message: 'Products not found.' });
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  create: async (req, res) => {
    const { body } = req;
    try {
      const newProduct = await ProductsService.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const product = await ProductsService.getOne(id);
      if (!product) res.status(404).json({ message: 'Product not found.' });
      const modifiedProduct = await ProductsService.update(product, body);
      res.status(200).json(modifiedProduct);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await ProductsService.getOne(id);
      if (!product) res.status(404).json({ message: 'Product not found.' });
      await ProductsService.delete(id);
      res.status(204).json({});
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
