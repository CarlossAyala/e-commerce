import Joi from "joi";

export const answer = Joi.object({
  content: Joi.string().label("Answer").min(5).max(255).required(),
});
