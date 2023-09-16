import { useQuery } from "@tanstack/react-query";
import { findAllByProductId, getScore, overview, timeline } from "../api";

const reviewKeys = {
  key: ["review"],
  overview: (query = "") => [...reviewKeys.key, "overview", query],
  timeline: (query = "") => [...reviewKeys.key, "timeline", query],
  findAllByProductId: (id, query) => [
    ...reviewKeys.key,
    "find-all-by-product-id",
    id,
    query,
  ],
  score: (id) => [...reviewKeys.key, "score", id],
};

export const useGetReviewOverview = (query) => {
  return useQuery({
    queryKey: reviewKeys.overview(query),
    queryFn: () => overview(query),
  });
};

export const useGetReviewTimeline = (query) => {
  return useQuery({
    queryKey: reviewKeys.timeline(query),
    queryFn: () => timeline(query),
  });
};

export const useGetProductReviews = (productId, query) => {
  return useQuery({
    queryKey: reviewKeys.findAllByProductId(productId, query),
    queryFn: () => findAllByProductId(productId, query),
    enabled: Boolean(productId),
  });
};

export const useGetReviewScore = (productId) => {
  return useQuery({
    queryKey: reviewKeys.score(productId),
    queryFn: () => getScore(productId),
    enabled: Boolean(productId),
  });
};
