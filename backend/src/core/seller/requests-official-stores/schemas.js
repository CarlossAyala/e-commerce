const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});
const description = Joi.string()
  .label("Description")
  .min(3)
  .max(255)
  .required();

const resourceId = Joi.object({
  id: id.required(),
});

const base = Joi.object({
  description,
});

module.exports = {
  resourceId,
  base,
};
