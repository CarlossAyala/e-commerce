import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create,
  findAllCustomer,
  findAllProduct,
  findAllProductCustomer,
} from "../api";

const questionKeys = {
  key: ["question"],
  productKey: (productId) => [...questionKeys.key, "product", productId],
  product: (productId, query) => [...questionKeys.productKey(productId), query],
  productCustomerKey: (productId) => [
    ...questionKeys.key,
    "product-customer",
    productId,
  ],
  productCustomer: (productId, query) => [
    ...questionKeys.productCustomerKey(productId),
    query,
  ],
  customerKey: () => [...questionKeys.key, "customer"],
  customer: (query) => [...questionKeys.customerKey(), query],
};

export const useGetProductQuestions = (productId, query = "") => {
  return useQuery({
    queryKey: questionKeys.product(productId, query),
    queryFn: () => findAllProduct(productId, query),
    enabled: Boolean(productId),
  });
};

export const useGetProductCustomerQuestions = (productId, query = "") => {
  return useQuery({
    queryKey: questionKeys.productCustomer(productId, query),
    queryFn: () => findAllProductCustomer(productId, query),
  });
};

export const useGetCustomerQuestions = (query = "") => {
  return useQuery({
    queryKey: questionKeys.customer(query),
    queryFn: () => findAllCustomer(query),
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([productId, question]) => create(productId, question),
    onSuccess: (_, [productId]) => {
      queryClient.invalidateQueries(questionKeys.customerKey());
      queryClient.invalidateQueries(questionKeys.productCustomerKey(productId));
    },
  });
};
