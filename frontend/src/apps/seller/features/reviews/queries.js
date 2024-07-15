import { useQuery } from "@tanstack/react-query";
import { createQueryKey, parseURLSearchParams } from "@/shared/utils";
import { useAuth } from "@/features/auth";
import { findAllByProductId, getProductAvgRating, findAll } from "./api";

export const reviewKeys = {
  key: createQueryKey({
    prefix: "seller",
    entity: "reviews",
    config: {
      removeOnSignout: true,
    },
  }),
  findAllKey: () => [...reviewKeys.key, "find-all"],
  findAll: (query) => [...reviewKeys.findAllKey(), query],
  findAllByProductIdKey: (id) => [
    ...reviewKeys.key,
    "find-all-by-product-id",
    id,
  ],
  findAllByProductId: (id, query) => [
    ...reviewKeys.findAllByProductIdKey(id),
    query,
  ],
  productAvgRating: (productId) => [...reviewKeys.key, "avg-rating", productId],
};

export const useGetReviews = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: reviewKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetReviewsProduct = (productId, query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: reviewKeys.findAllByProductId(productId, _query),
    queryFn: () => findAllByProductId(productId, query, accessToken),
    enabled: !!productId,
  });
};

export const useGetReviewAvgRating = (productId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: reviewKeys.productAvgRating(productId),
    queryFn: () => getProductAvgRating(productId, accessToken),
    enabled: !!productId,
  });
};
