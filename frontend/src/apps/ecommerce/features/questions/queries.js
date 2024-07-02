import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import { create, findAllCustomer, findAllProduct } from "./api";

const qaKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "questions",
    config: {
      removeOnSignout: true,
    },
  }),
  productKey: (productId) => [...qaKeys.key, "product", productId],
  product: (productId, query) => [...qaKeys.productKey(productId), query],
  customerKey: () => [...qaKeys.key, "customer"],
  customer: (query) => [...qaKeys.customerKey(), query],
};

export const useGetProductQuestions = (productId, query) => {
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: qaKeys.product(productId, _query),
    queryFn: () => findAllProduct(productId, query),
    enabled: !!productId,
    keepPreviousData: true,
  });
};

export const useGetCustomerQuestions = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: qaKeys.customer(_query),
    queryFn: () => findAllCustomer(query, accessToken),
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ productId, values }) => {
      return create(productId, values, accessToken);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: qaKeys.customerKey(),
      });
    },
  });
};
