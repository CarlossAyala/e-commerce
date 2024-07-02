import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/features/auth";
import {
  create,
  findAllByProductId,
  findAllDone,
  findAllPending,
  stat,
} from "../api";

export const reviewKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "reviews",
    config: {
      removeOnSignout: true,
    },
  }),
  findAllDoneKey: () => [...reviewKeys.key, "find-all-done"],
  findAllDone: (query) => [...reviewKeys.findAllDoneKey(), query],
  findAllPendingKey: () => [...reviewKeys.key, "find-all-pending"],
  findAllPending: (query) => [...reviewKeys.findAllPendingKey(), query],
  findAllByProductIdKey: (productId) => [
    ...reviewKeys.key,
    "find-all-by-product-id",
    productId,
  ],
  findAllByProductId: (productId, query) => [
    ...reviewKeys.findAllByProductIdKey(productId),
    query,
  ],
  stats: (productId) => [...reviewKeys.key, "stats", productId],
};

export const useGetReviews = (productId, query) => {
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: reviewKeys.findAllByProductId(productId, _query),
    queryFn: () => findAllByProductId(productId, query),
  });
};

export const useGetReviewsStat = (productId) => {
  return useQuery({
    queryKey: reviewKeys.stats(productId),
    queryFn: () => stat(productId),
  });
};

export const useGetReviewsDone = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: reviewKeys.findAllDone(_query),
    queryFn: () => findAllDone(query, accessToken),
  });
};

export const useGetReviewsPending = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: reviewKeys.findAllPending(_query),
    queryFn: () => findAllPending(query, accessToken),
  });
};

export const useCreateReview = (orderItemId) => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(orderItemId, values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.findAllDoneKey(),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.findAllPendingKey(),
      });
    },
  });
};
