const Joi = require("joi");

const quantity = Joi.number().label("Quantity").integer().min(1).required();

const base = Joi.object({
  quantity,
});

module.exports = {
  create: base,
  update: base,
};
