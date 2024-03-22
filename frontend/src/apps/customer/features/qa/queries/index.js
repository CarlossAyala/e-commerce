import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import {
  create,
  findAllCustomer,
  findAllProduct,
  findAllProductCustomer,
} from "../api";
import { parseURLSearchParams } from "@/shared/utils";

const qaKeys = {
  key: ["e-commerce/qa"],
  productKey: (productId) => [...qaKeys.key, "product", productId],
  product: (productId, query) => [...qaKeys.productKey(productId), query],
  productCustomerKey: (productId) => [
    ...qaKeys.key,
    "product-customer",
    productId,
  ],
  productCustomer: (productId, query) => [
    ...qaKeys.productCustomerKey(productId),
    query,
  ],
  customerKey: () => [...qaKeys.key, "customer"],
  customer: (query) => [...qaKeys.customerKey(), query],
};

export const useGetProductQuestions = (productId, query) => {
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: qaKeys.product(productId, _query),
    queryFn: () => findAllProduct(productId, query),
    enabled: !!productId,
  });
};

export const useGetProductCustomerQuestions = (productId, query) => {
  const { accessToken } = useAuth();
  console.log({ accessToken });

  return useQuery({
    queryKey: qaKeys.productCustomer(productId, query),
    queryFn: () => findAllProductCustomer(productId, query, accessToken),
  });
};

export const useGetCustomerQuestions = (query) => {
  return useQuery({
    queryKey: qaKeys.customer(query),
    queryFn: () => findAllCustomer(query),
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ productId, values }) => {
      return create(productId, values, accessToken);
    },
    onSuccess: async (_, { productId }) => {
      await queryClient.invalidateQueries({
        queryKey: qaKeys.customerKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: qaKeys.productCustomerKey(productId),
      });
    },
  });
};
