import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { cartKeys } from "../../cart";
import { confirm, create, findOne } from "../api";
import { useCheckout } from "../context";

const checkoutKeys = {
  key: ["ecommerce/checkout"],
  findPaymentIntent: (paymentIntentId) => [
    ...checkoutKeys.key,
    "find-payment-intent",
    paymentIntentId,
  ],
};

export const useGetPaymentIntent = (paymentIntentId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: checkoutKeys.findPaymentIntent(paymentIntentId),
    queryFn: () => findOne(paymentIntentId, accessToken),
    enabled: !!paymentIntentId,
  });
};

export const useCreatePaymentIntent = () => {
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: () => create(accessToken),
    meta: {
      title: "Checkout",
    },
  });
};

export const useConfirmPaymentIntent = (paymentIntentId) => {
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => confirm(paymentIntentId, values, accessToken),
    meta: {
      title: "Checkout",
    },
  });
};

export const useCleanUpCheckout = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { resetCheckout } = useCheckout();

  useEffect(() => {
    const { state } = location;
    if (state?.paymentIntentId) {
      resetCheckout();
      queryClient.removeQueries(
        checkoutKeys.findPaymentIntent(state.paymentIntentId),
      );
      queryClient.invalidateQueries(cartKeys.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.paymentIntentId]);
};
