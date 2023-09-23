const Joi = require("joi");

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const answer = Joi.object({
  answer: Joi.string().label("Answer").min(3).max(255).required(),
});

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  resourceId,
  answer,
};
