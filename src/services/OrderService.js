const { Order } = require('../models');

module.exports = {
  getAllOrders: () => Order.find(),
  findByIdAndUpdate: (orderId, complete) => Order.findByIdAndUpdate(orderId, complete),

};
