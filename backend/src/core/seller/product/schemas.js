const Joi = require("joi");
const { Product } = require("../../../database/mysql/models");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const conditions = Object.values(Product.enums.condition);
const stock = Joi.number().label("Stock").integer().min(0).required();
const _stockAlert = Joi.number()
  .label("Stock Alert")
  .allow(null)
  .integer()
  .min(1);
const base = Joi.object({
  name: Joi.string().label("Name").min(3).max(255).required(),
  description: Joi.string().label("Description").min(3).max(255).required(),
  stock,
  stockAlert: _stockAlert,
  price: Joi.number().label("Price").precision(2).min(1).required(),
  available: Joi.boolean().label("Available").required(),
  condition: Joi.string()
    .label("Condition")
    .lowercase()
    .valid(...conditions)
    .required(),
  categoryId: id.label("Category Id").required(),
});

const stockAlert = Joi.object({
  stock,
  stockAlert: _stockAlert,
});

module.exports = {
  create: base,
  update: base,
  stockAlert,
};
