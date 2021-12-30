const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  items: [{
    product_id: String,
    quantity: Number,
    price: Number,
  }],
  state: {
    type: String,
    enum: ['GENERATED', 'PAID', 'SENT', 'FINALIZED'],
    default: 'GENERATED',
  },
}, {
  timestamps: true,
  versionKey: false,
});

const Order = model('order', orderSchema, 'order');

module.exports = {
  Order,
};
