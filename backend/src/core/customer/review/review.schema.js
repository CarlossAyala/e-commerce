const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const base = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  description: Joi.string().min(5).max(255).required(),
});

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  resourceId,
  base,
};
