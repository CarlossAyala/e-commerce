import Joi from "joi";

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

const content = Joi.string().min(5).max(255).label("Content").required();

export const create = Joi.object({
  content,
});

export const resourceId = Joi.object({
  id: id.required(),
});
