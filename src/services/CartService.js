// var query = { campaign_id: new ObjectId(campaign._id) };
const { Cart } = require('../models/index');

module.exports = {
  getAllCarts: () => Cart.find(),
  create: (newCartInfo) => new Cart(newCartInfo).save(),
  addProductToCart: async (idCart, body) => {
    const carts = await this.getAllCarts();
    console.log(carts);
  //   cart.products.push(body);
  //   cart.save();
  },
  delete: (idCart) => Cart.findByIdAndDelete(idCart),
};
