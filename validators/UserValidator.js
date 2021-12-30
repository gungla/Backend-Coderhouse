const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirm_password: Joi.string().required(),
      phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      admin: Joi.boolean(),
      address: Joi.object().keys({
        street: Joi.string().required(),
        height: Joi.string().required(),
        postal_code: Joi.number().required(),
        floor: Joi.string(),
        department: Joi.string(),
      }),
    }),
  }),
  getOne: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      confirm_password: Joi.string(),
      phone: Joi.string().length(10).pattern(/^[0-9]+$/),
    }),

  }),
  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
};
