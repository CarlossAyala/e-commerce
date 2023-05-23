const Joi = require('joi');
const { Product } = require('../../database/mysql/models');

const conditionEnums = Object.values(Product.enums);

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const name = Joi.string();
const description = Joi.string();
const stock = Joi.number().integer().positive().min(0);
const price = Joi.number().min(1).precision(2);
const available = Joi.boolean().when('stock', {
  is: Joi.number().valid(0),
  then: Joi.boolean().valid(false).required(),
  otherwise: Joi.boolean().required(),
});
const condition = Joi.string().valid(...conditionEnums);
const categoryId = id;
const businessId = id;

const uuidV4 = Joi.object({
  id: id.required(),
});

const base = Joi.object({
  name: name.required(),
  description: description.required(),
  stock: stock.required(),
  price: price.required(),
  available,
  condition,
  categoryId: categoryId.required(),
  businessId: businessId.required(),
});

module.exports = {
  uuidV4,
  base,
};
