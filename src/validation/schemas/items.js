const Joi = require('joi');

module.exports = {
  createItem: {
    body: Joi.object().keys({
      category: Joi.string().min(1).max(100).required(),
      name: Joi.string().min(1).max(255).required(),
      price: Joi.number().required(),
    }),
  },
  updateItem: {
    params: Joi.object().keys(({
      itemId: Joi.number().required(),
    })),
    body: Joi.object().keys({
      category: Joi.string().min(1).max(100).optional(),
      name: Joi.string().min(1).max(100).optional(),
      price: Joi.number().optional(),
    }).min(1),
  },
  removeItem: {
    params: Joi.object().keys(({
      itemId: Joi.number().required(),
    })),
  },
};
