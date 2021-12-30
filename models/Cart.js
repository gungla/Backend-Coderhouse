const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  products: {
    type: Array,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    postal_code: {
      type: Number,
      required: true,
    },
    floor: {
      type: String,
    },
    department: {
      type: String,
    },
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Cart = model('cart', cartSchema, 'cart');

module.exports = {
  Cart,
};
