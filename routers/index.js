const express = require('express');
const { verifyTokenUser, verifyTokenAdmin } = require('../middlewares');

const router = express.Router();

router.use('/users', verifyTokenAdmin, require('./UserRouter'));
router.use('/signup', require('./SignupRouter'));
router.use('/login', require('./LoginRouter'));
router.use('/products', require('./ProductsRoute'));
router.use('/cart', verifyTokenUser, require('./CartRouter'));
router.use('/orders', verifyTokenUser, require('./OrderRouter'));
router.use('/image', require('./ImagesRouter'));

module.exports = router;
