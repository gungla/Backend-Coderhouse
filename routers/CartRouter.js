const express = require('express');
const { CartController } = require('../controllers');
const { CartValidator } = require('../validators');

const router = express.Router();

router.get('/', CartController.getUserCart);
router.get('/all', CartController.getAllCarts);
router.post('/add', CartValidator.addProductToCart,
  CartController.addProductToCart);
router.delete('/delete', CartValidator.deleteProductFromCart,
  CartController.deleteProductFromCart);
router.post('/submit', CartController.submit);

module.exports = router;
