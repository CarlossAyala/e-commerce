import { create } from "zustand";

const initialState = {
  paymentIntentId: "",
  addressId: "",
  paymentMethodId: "",
};

export const useCheckoutStore = create(() => initialState);

export const useUpdateCheckoutPaymentIntent = () => {
  return (paymentIntentId) => useCheckoutStore.setState({ paymentIntentId });
};

export const useUpdateCheckoutAddress = () => {
  return (addressId) => useCheckoutStore.setState({ addressId });
};

export const useUpdateCheckoutPaymentMethod = () => {
  return (paymentMethodId) => useCheckoutStore.setState({ paymentMethodId });
};

export const useResetCheckoutStore = () => {
  return () => useCheckoutStore.setState(initialState);
};
