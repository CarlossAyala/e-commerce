const Joi = require("joi");

const base = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  description: Joi.string().min(5).max(255).required(),
});

module.exports = {
  create: base,
};
