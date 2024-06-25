const Joi = require("joi");

const text = Joi.string().label("Text").min(1).max(255).required();

const create = Joi.object({
  text,
});

module.exports = {
  create,
};
