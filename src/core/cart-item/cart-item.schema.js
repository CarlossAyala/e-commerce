const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const quantity = Joi.number().integer().positive().greater(0);

const resourceId = Joi.object({
  id: id.required(),
});

const productId = Joi.object({
  productId: id.required(),
});

const addProduct = Joi.object({
  quantity: quantity.required(),
});

const updateProduct = Joi.object({
  quantity: quantity.required(),
});

module.exports = {
  resourceId,
  productId,
  addProduct,
  updateProduct,
};
