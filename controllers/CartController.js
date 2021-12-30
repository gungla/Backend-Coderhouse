/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { CartService, ProductsService } = require('../services');
const { Cart, Product, Order } = require('../models');
const {
  findCommonElement,
} = require('../utils');
const { sendEmail } = require('../services/MailService');

module.exports = {
  getUserCart: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      const cart = carts.filter((e) => (e.user_id.toString() === idUser));
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getAllCarts: async (req, res) => {
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addProductToCart: async (req, res) => {
    const { body } = req;
    const idUser = req.decoded._id;
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      const cart = carts.filter((e) => (e.user_id.toString() === idUser))[0];
      if (!cart) res.status(400).json({ message: 'Cart not found.' });
      const products = await ProductsService.getAll();
      const product = products.filter((e) => e._id.toString() === body.product_id)[0];
      if (!product) res.status(400).json({ message: 'Product not found.' });

      if (product.stock < body.quantity || product.stock <= 0) return res.status(400).json({ message: 'Out of stock.' });
      const stock = (product.stock - body.quantity);
      await ProductsService.updateQuantity(product._id, stock);
      const anotherCart = await Cart.findById(cart._id);
      anotherCart.products.push(body);
      const updatedCart = await Cart.findByIdAndUpdate(cart._id, anotherCart);

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteProductFromCart: async (req, res) => {
    const { body } = req;
    const idUser = req.decoded._id;
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      const cart = carts.filter((e) => (e.user_id.toString() === idUser))[0];
      if (!cart) res.status(400).json({ message: 'Cart not found.' });
      const products = await ProductsService.getAll();
      const product = products.filter((e) => e._id.toString() === body.product_id)[0];
      if (!product) res.status(400).json({ message: 'Product not found.' });
      const stock = (product.stock + body.quantity);
      await ProductsService.updateQuantity(product._id, stock);

      const anotherCart = await Cart.findById(cart._id);

      const resCart = anotherCart.products.map((e) => {
        if ((e.quantity - body.quantity) === 0
        && e.product_id === body.product_id) {
          return undefined;
        }
        if (e.product_id === body.product_id) {
          return {
            product_id: e.product_id,
            quantity: e.quantity - body.quantity,
          };
        }
        return e;
      });
      anotherCart.products = resCart;
      anotherCart.save();
      res.status(200).json(resCart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  submit: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      const cart = carts.filter((e) => (e.user_id.toString() === idUser))[0];
      if (!cart.products.length) res.status(400).json({ message: 'Cart is empty.' });
      const productArr = cart.products.filter((e) => e !== null);
      const productIds = productArr.map((e) => e.product_id);
      const productDetails = await Product.find({
        _id: {
          $in: productIds,
        },
      }, (err, products) => {
        if (err) console.log(err);
        return products;
      });
      const itemsCommon = findCommonElement(productArr, productDetails);
      const order = {
        user_id: idUser,
        items: [itemsCommon],
      };
      const createdOrder = await new Order(order).save();
      await sendEmail(req.decoded, createdOrder);
      const emptyCart = await Cart.find({
        user_id: {
          $in: idUser,
        },
      }, (err, products) => {
        if (err) console.log(err);
        return products;
      });
      await Cart.findByIdAndUpdate(emptyCart[0]._id,
        { products: [] },
        { new: true });
      res.status(200).json(createdOrder);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
