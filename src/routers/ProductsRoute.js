const express = require('express');
const { ProductsController } = require('../controllers');
const { ProductsValidator } = require('../validators');
const { verifyTokenAdmin } = require('../middlewares');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:category', ProductsValidator.getProductsByCategory, ProductsController.getProductsByCategory);
router.post('/', verifyTokenAdmin, ProductsValidator.create, ProductsController.create);
router.patch('/:id', verifyTokenAdmin, ProductsValidator.update, ProductsController.update);
router.delete('/:id', verifyTokenAdmin, ProductsValidator.delete, ProductsController.delete);

module.exports = router;
