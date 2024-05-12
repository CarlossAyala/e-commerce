const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const content = Joi.string().min(5).max(255).label("Content").required();

const create = Joi.object({
  content,
});

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  create,
  resourceId,
};
