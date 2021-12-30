/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  comparePasswords: (userPassword, reqPassword) => bcrypt.compareSync(reqPassword, userPassword),
  createToken: (user) => {
    try {
      const token = jwt.sign(
        {
          // eslint-disable-next-line no-underscore-dangle
          _id: user._id,
          first_name: user.first_name,
          email: user.email,
          orders: user.orders,
          admin: user.admin,
          // exp: Math.floor(Date.now() / 1000) + (60 * 60),
        },
        process.env.JWT_SECRET,
      );
      return token;
    } catch (error) {
      return undefined;
    }
  },
  extractUserInfo: (body) => ({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: body.password,
    confirm_password: body.confirm_password,
    phone: body.phone,
    admin: body.admin,
    orders: body.orders,
  }),

  makeNewCart: (idUser, body) => ({
    user_id: idUser,
    products: [],
    address: body.address,
  }),
  findCommonElement: (productsArray, productsDetails) => {
    // Loop for array1
    for (let i = 0; i < productsArray.length; i++) {
      // Loop for array2
      for (let j = 0; j < productsDetails.length; j++) {
        // Compare the element of each and
        // every element from both of the
        // arrays
        if (productsArray[i].product_id.toString() === productsDetails[j]._id.toString()) {
          // Return if common element found
          return {
            product_id: productsArray[i].product_id,
            quantity: productsArray[i].quantity,
            price: productsDetails[j].price,
          };
        }
      }
    }

    // Return if no common element exist
    return false;
  },
};
