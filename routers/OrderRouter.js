const express = require('express');
const { OrderController } = require('../controllers');
const { OrderValidator } = require('../validators');

const router = express.Router();

router.get('/', OrderController.getAllUserOrders);
router.get('/:id', OrderValidator.getOneOrder, OrderController.getOrderById);
router.post('/complete', OrderValidator.completeOrder, OrderController.completeOrder);

module.exports = router;
