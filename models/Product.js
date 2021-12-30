const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'image',
      default: [],
    },
  ],
}, {
  timestamps: true,
  versionKey: false,
});

const Product = model('product', productSchema, 'product');

module.exports = {
  Product,
};
