const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const name = Joi.string().label("Name").min(3).max(255).required();
const description = Joi.string()
  .label("Description")
  .min(3)
  .max(255)
  .required();
const stock = Joi.number().label("Stock").integer().min(0).required();
const price = Joi.number().label("Price").precision(2).min(0).required();
const available = Joi.boolean().label("Available").required();
const condition = Joi.string()
  .label("Condition")
  .lowercase()
  .valid(...["new", "used", "reconditioned"])
  .required();
const categoryId = id.label("Category Id").required();

const create = Joi.object({
  name,
  description,
  stock,
  price,
  condition,
  available,
  categoryId,
});

const update = Joi.object({
  name,
  description,
  stock,
  price,
  condition,
  available,
  categoryId,
  currentGallery: Joi.array()
    .label("Current Gallery")
    .items(id)
    .max(10)
    .allow(null)
    .default([]),
});

module.exports = {
  create,
  update,
};
