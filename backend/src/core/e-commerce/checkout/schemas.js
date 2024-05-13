import Joi from "joi";

const paymentMethodId = Joi.string().label("Payment Method").required();
const addressId = Joi.string().label("Address").guid().required();

export const confirmPaymentIntent = Joi.object({
  paymentMethodId,
  addressId,
});
