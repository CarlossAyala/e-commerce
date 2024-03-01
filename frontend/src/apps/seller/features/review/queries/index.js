import { useQuery } from "@tanstack/react-query";
import {
  findAllByProductId,
  findOne,
  getScore,
  overview,
  timeline,
} from "../api";

export const reviewKeys = {
  key: ["seller/review"],
  findOne: (id) => [...reviewKeys.key, "find-one", id],
  overview: (query) => [...reviewKeys.key, "overview", query],
  timeline: (query) => [...reviewKeys.key, "timeline", query],
  findAllByProductIdKey: (id) => [
    ...reviewKeys.key,
    "find-all-by-product-id",
    id,
  ],
  findAllByProductId: (id, query) => [
    ...reviewKeys.findAllByProductIdKey(id),
    query,
  ],
  score: (id) => [...reviewKeys.key, "score", id],
};

export const useGetReview = (reviewId) => {
  return useQuery({
    queryKey: reviewKeys.findOne(reviewId),
    queryFn: () => findOne(reviewId),
    enabled: Boolean(reviewId),
  });
};

export const useGetReviewOverview = (query = "") => {
  return useQuery({
    queryKey: reviewKeys.overview(query),
    queryFn: () => overview(query),
  });
};

export const useGetReviewTimeline = (query = "") => {
  return useQuery({
    queryKey: reviewKeys.timeline(query),
    queryFn: () => timeline(query),
  });
};

export const useGetProductReviews = (productId, query = "") => {
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
