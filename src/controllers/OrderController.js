/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { OrderService } = require('../services');
const { sendEmail } = require('../services/MailService');

module.exports = {
  getAllUserOrders: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const allOrders = await OrderService.getAllOrders();
      // eslint-disable-next-line max-len
      const userOrders = allOrders.filter((order) => order.user_id.toString() === idUser.toString());
      if (!userOrders) res.status(401).json({ message: 'User has no orders.' });
      res.status(200).json(userOrders);
    } catch (error) {
      res.status(401).json(error);
    }
  },
  getOrderById: async (req, res) => {
    const idUser = req.decoded._id;
    const idOrder = req.params.id;
    try {
      const allOrders = await OrderService.getAllOrders();
      // eslint-disable-next-line max-len
      const userOrders = allOrders.filter((order) => order.user_id.toString() === idUser.toString());
      if (!userOrders) res.status(401).json({ message: 'User has no orders.' });
      const order = userOrders.filter((ord) => ord._id.toString() === idOrder.toString());
      if (!order) res.status(401).json({ message: 'Order not found.' });
      res.status(200).json(order);
    } catch (error) {
      res.status(401).json(error);
    }
  },
  completeOrder: async (req, res) => {
    const idUser = req.decoded._id;
    const idOrder = req.body.id;
    try {
      const allOrders = await OrderService.getAllOrders();
      // eslint-disable-next-line max-len
      const userOrders = allOrders.filter((order) => order.user_id.toString() === idUser.toString());
      if (!userOrders) res.status(401).json({ message: 'User has no orders.' });
      const order = userOrders.filter((ord) => ord._id.toString() === idOrder.toString());
      if (!order) res.status(401).json({ message: 'Order not found.' });
      // eslint-disable-next-line quotes
      if (order[0].state !== "GENERATED") return res.status(401).json({ message: 'Order cannot be completed.' });
      const completedOrder = await OrderService.findByIdAndUpdate(idOrder, { state: 'FINALIZED' });
      sendEmail(req.decoded, completedOrder);
      res.status(200).json(completedOrder);
    } catch (error) {
      res.status(401).json(error);
    }
  },
};
