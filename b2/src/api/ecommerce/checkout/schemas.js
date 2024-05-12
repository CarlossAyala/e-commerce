const Joi = require("joi");

const paymentMethodId = Joi.string().label("Payment Method").required();
const addressId = Joi.string().label("Address").guid().required();

const confirmPaymentIntent = Joi.object({
  paymentMethodId,
  addressId,
});

module.exports = {
  confirmPaymentIntent,
};
