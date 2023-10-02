const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const resourceId = Joi.object({
  id: id.required(),
});

const quantity = Joi.number().integer().min(1);

const base = Joi.object({
  quantity: quantity.required(),
});

module.exports = {
  resourceId,
  base,
};
