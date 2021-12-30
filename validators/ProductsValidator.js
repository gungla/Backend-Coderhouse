const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  getProductsByCategory: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      category: Joi.string().required(),
    }),
  }),
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      images: Joi.array(),
    }),
  }),
  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
      price: Joi.number(),
      stock: Joi.number(),
      images: Joi.array(),
    }),
  }),
  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
};
