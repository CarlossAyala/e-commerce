import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { cartKeys } from "../../cart";
import { useCheckout } from "../context";
import { confirm, create, findOne } from "../api";

const checkoutKeys = {
  key: ["customer/checkout"],
  findOne: (paymentIntentId) => [
    ...checkoutKeys.key,
    "find-one",
    paymentIntentId,
  ],
};

export const useGetCheckout = (paymentIntentId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: checkoutKeys.findOne(paymentIntentId),
    queryFn: () => findOne(paymentIntentId, accessToken),
    enabled: !!paymentIntentId,
  });
};

export const useCreateCheckout = () => {
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: () => create(accessToken),
  });
};

export const useConfirmCheckout = (paymentIntentId) => {
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => confirm(paymentIntentId, values, accessToken),
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
      queryClient.invalidateQueries(
        checkoutKeys.findOne(state.paymentIntentId),
      );
      queryClient.invalidateQueries(cartKeys.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.paymentIntentId]);
};
