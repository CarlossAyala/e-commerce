const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const resourceId = Joi.object({
  id: id.required(),
});

const resourceName = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  resourceId,
  resourceName,
};
