import { useQuery } from "@tanstack/react-query";
import API from "./review.api";

const reviewKeys = {
  key: ["review"],
  overview: (query = "") => [...reviewKeys.key, "overview", query],
  timeline: (query = "") => [...reviewKeys.key, "timeline", query],
  product: (id) => [...reviewKeys.key, "product", id],
  productScore: (id) => [...reviewKeys.key, "product-score", id],
};

export const useGetProductReviews = (id) => {
  return useQuery({
    queryKey: reviewKeys.product(id),
    queryFn: () => API.product(id),
    enabled: Boolean(id),
  });
};

export const useGetReviewTimeline = (query) => {
  return useQuery({
    queryKey: reviewKeys.timeline(query),
    queryFn: () => API.timeline(query),
  });
};

export const useGetReviewOverview = (query) => {
  return useQuery({
    queryKey: reviewKeys.overview(query),
    queryFn: () => API.overview(query),
  });
};

export const useGetScoreReview = (id) => {
  return useQuery({
    queryKey: reviewKeys.productScore(id),
    queryFn: () => API.productScore(id),
    enabled: Boolean(id),
  });
};
