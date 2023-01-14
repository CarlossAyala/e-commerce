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
const sold = Joi.number().integer().positive().min(0);
const price = Joi.number().min(1).precision(2);
const available = Joi.boolean();
const condition = Joi.string().valid(...conditionEnums);
const fkCategory = id;
const fkBusiness = id;

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  description: description.required(),
  stock: stock.required(),
  sold: sold.required(),
  price: price.required(),
  available: available.required(),
  condition: condition.required(),
  fkCategory: fkCategory.required(),
  fkBusiness: fkBusiness.required(),
});

const update = Joi.object({
  name,
  description,
  stock,
  sold,
  price,
  available,
  condition,
  fkCategory,
});

module.exports = {
  resourceId,
  create,
  update,
};
