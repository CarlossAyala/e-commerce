import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAll, findOne, like, stats } from "../api";

export const reviewKeys = {
  key: ["review"],
  findOne: (reviewId) => [...reviewKeys.key, "find-one", reviewId],
  findAllKey: (productId) => [...reviewKeys.key, "find-all", productId],
  findAll: (productId, query) => [...reviewKeys.findAllKey(productId), query],
  stats: (productId) => [...reviewKeys.key, "stats", productId],
};

export const useGetReview = (reviewId) => {
  return useQuery({
    queryKey: reviewKeys.findOne(reviewId),
    queryFn: () => findOne(reviewId),
    enabled: Boolean(reviewId),
  });
};

export const useGetReviews = (productId, query) => {
  return useQuery({
    queryKey: reviewKeys.findAll(productId, query),
    queryFn: () => findAll(productId, query),
    enabled: Boolean(productId),
  });
};

export const useGetReviewStats = (productId) => {
  return useQuery({
    queryKey: reviewKeys.stats(productId),
    queryFn: () => stats(productId),
    enabled: Boolean(productId),
  });
};

export const useLikeReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: like,
    onSuccess: (_, reviewId) => {
      queryClient.invalidateQueries(reviewKeys.findAllKey(reviewId));
    },
  });
};

export const useDislikeReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: like,
    onSuccess: (_, reviewId) => {
      queryClient.invalidateQueries(reviewKeys.findAllKey(reviewId));
    },
  });
};
