const Joi = require("joi");

const answer = Joi.object({
  answer: Joi.string().label("Answer").min(5).max(255).required(),
});

module.exports = {
  answer,
};
