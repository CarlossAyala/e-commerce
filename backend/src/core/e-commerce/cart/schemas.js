import Joi from "joi";

const quantity = Joi.number().label("Quantity").integer().min(1).required();

const base = Joi.object({
  quantity,
});

export default {
  create: base,
  update: base,
};
