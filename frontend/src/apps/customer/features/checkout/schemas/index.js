import { string, object } from "yup";

const addressId = string().label("Address").default("").required();
const paymentMethodId = string().label("Payment Method").default("").required();

export const checkoutAddressSchema = object({
  addressId,
});

export const checkoutPaymentMethodSchema = object({
  paymentMethodId,
});

export const checkoutReviewSchema = object({
  addressId,
  paymentMethodId,
});

export const checkoutAddressInitial = checkoutAddressSchema.getDefault();
export const checkoutPaymentMethodInitial =
  checkoutPaymentMethodSchema.getDefault();
export const checkoutReviewInitial = checkoutReviewSchema.getDefault();

export const checkoutAddressDefault = (addressId) => {
  return {
    addressId: addressId ?? checkoutAddressInitial.addressId,
  };
};
export const checkoutPaymentMethodDefault = (paymentMethodId) => {
  return {
    paymentMethodId:
      paymentMethodId ?? checkoutPaymentMethodInitial.paymentMethodId,
  };
};
export const checkoutReviewDefault = (values) => {
  return {
    addressId: values.addressId ?? checkoutAddressInitial.addressId,
    paymentMethodId:
      values.paymentMethodId ?? checkoutPaymentMethodInitial.paymentMethodId,
  };
};
