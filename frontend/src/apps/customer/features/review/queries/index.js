import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, findAll, findAllByCustomer, findOne, stats } from "../api";

export const reviewKeys = {
  key: ["review"],
  findOneKey: (reviewId) => [...reviewKeys.key, "find-one", reviewId],
  findOne: (reviewId, query) => [...reviewKeys.findOneKey(reviewId), query],
  findAllKey: (productId) => [...reviewKeys.key, "find-all", productId],
  findAll: (productId, query) => [...reviewKeys.findAllKey(productId), query],
  stats: (productId) => [...reviewKeys.key, "stats", productId],
  findAllCustomerKey: () => [...reviewKeys.key, "find-all-customer"],
  findAllCustomer: (query) => [...reviewKeys.findAllCustomerKey(), query],
};

export const useGetReview = (reviewId, query = "") => {
  return useQuery({
    queryKey: reviewKeys.findOne(reviewId),
    queryFn: () => findOne(reviewId, query),
    enabled: Boolean(reviewId),
  });
};

export const useGetReviews = (productId, query = "") => {
  return useQuery({
    queryKey: reviewKeys.findAll(productId, query),
    queryFn: () => findAll(productId, query),
    enabled: Boolean(productId),
  });
};

export const useGetReviewsCustomer = (query) => {
  return useQuery({
    queryKey: reviewKeys.findAllCustomer(query),
    queryFn: () => findAllByCustomer(query),
  });
};

export const useGetReviewStats = (productId) => {
  return useQuery({
    queryKey: reviewKeys.stats(productId),
    queryFn: () => stats(productId),
    enabled: Boolean(productId),
  });
};

export const useCreateReview = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([, values]) => create(reviewId, values),
    onSuccess: (_, [productId]) => {
      queryClient.invalidateQueries(reviewKeys.stats(productId));
      queryClient.invalidateQueries(reviewKeys.findAllKey(productId));
      queryClient.invalidateQueries(reviewKeys.findAllCustomerKey());
    },
  });
};
