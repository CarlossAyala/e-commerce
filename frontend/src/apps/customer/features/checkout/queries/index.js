import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { confirm, create, findOne } from "../api";
import { useCheckout } from "../context";
import { cartKeys } from "../../cart";

const checkoutKeys = {
  key: ["checkout"],
  findOne: (paymentIntentId) => [
    ...checkoutKeys.key,
    "find-one",
    paymentIntentId,
  ],
};

export const useGetCheckout = (paymentIntentId) => {
  return useQuery({
    queryKey: checkoutKeys.findOne(paymentIntentId),
    queryFn: () => findOne(paymentIntentId),
    enabled: !!paymentIntentId,
  });
};

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: create,
  });
};

export const useConfirmCheckout = (paymentIntentId) => {
  return useMutation({
    mutationFn: (data) => confirm(paymentIntentId, data),
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
