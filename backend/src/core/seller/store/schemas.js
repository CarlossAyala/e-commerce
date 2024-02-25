const Joi = require("joi");

const name = Joi.string().label("Name").min(3).max(255).trim().required();
const description = Joi.string()
  .label("Description")
  .min(3)
  .max(255)
  .required();

const create = Joi.object({
  name,
  description,
});

const update = Joi.object({
  name,
  description,
});

module.exports = {
  create,
  update,
};
