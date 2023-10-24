const Joi = require("joi");

const id = Joi.string()
  .guid({
    version: "uuidv4",
    separator: "-",
  })
  .label("Store ID");

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  resourceId,
};
