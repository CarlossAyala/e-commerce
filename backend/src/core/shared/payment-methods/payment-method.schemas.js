const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const resourceId = Joi.object({
  id: id.required(),
});
module.exports = {
  resourceId,
};
