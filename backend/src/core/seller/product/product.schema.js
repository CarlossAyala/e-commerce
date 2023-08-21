const Joi = require("joi");
const { Product } = require("../../../database/mysql/models");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const conditions = Object.values(Product.enums.condition);

const base = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).max(255).required(),
  stock: Joi.number().integer().min(0).required(),
  stockAlert: Joi.number().integer().min(0).required(),
  price: Joi.number().precision(2).min(1).required(),
  available: Joi.boolean().required(),
  condition: Joi.string()
    .lowercase()
    .valid(...conditions)
    .required(),
  categoryId: id.required(),
});

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  base,
  resourceId,
};
