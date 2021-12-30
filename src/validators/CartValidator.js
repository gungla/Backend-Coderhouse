const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  addProductToCart: celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_id: Joi.string().required(),
      quantity: Joi.number().required(),
    }),
  }),
  deleteProductFromCart: celebrate({
    [Segments.BODY]: Joi.object().keys({
      quantity: Joi.number().required(),
      product_id: Joi.string().required(),
    }),
  }),
};
