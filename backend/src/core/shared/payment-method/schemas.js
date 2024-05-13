import Joi from "joi";

const uuid = Joi.string().guid();
const paymentIntentId = Joi.string().label("Payment Intent Id").required();
const addressId = uuid.label("Address Id");

export const create = Joi.object({
  paymentIntentId,
  addressId,
});
