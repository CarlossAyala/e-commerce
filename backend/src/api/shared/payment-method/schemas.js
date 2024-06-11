const Joi = require("joi");

const uuid = Joi.string().guid();
const paymentIntentId = Joi.string().label("Payment Intent Id").required();
const addressId = uuid.label("Address Id");

const create = Joi.object({
  paymentIntentId,
  addressId,
});

module.exports = { create };
