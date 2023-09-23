const Joi = require("joi");

const name = Joi.string().min(3).max(255).trim().required();
const description = Joi.string().min(3).max(255).required();

const base = Joi.object({
  name,
  description,
});

module.exports = {
  base,
};
