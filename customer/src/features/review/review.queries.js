import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './review.api';

const reviewKeys = {
  key: ['review'],
  stats: (id) => [...reviewKeys.key, 'product-stats', id],
  reviews: (id) => [...reviewKeys.key, 'product-reviews', id],
};

export const useGetReviewsStats = (id) => {
  return useQuery({
    queryKey: reviewKeys.stats(id),
    queryFn: () => API.getStats(id),
    enabled: Boolean(id),
  });
};

export const useGetReviews = (id) => {
  return useQuery({
    queryKey: reviewKeys.reviews(id),
    queryFn: () => API.getReviews(id),
    enabled: Boolean(id),
  });
};

export const useLikeReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([reviewId]) => API.likeReview(reviewId),
    onSuccess: (_, [, productId]) => {
      queryClient.invalidateQueries(reviewKeys.reviews(productId));
    },
  });
};

export const useDislikeReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([reviewId]) => API.dislikeReview(reviewId),
    onSuccess: (_, [, productId]) => {
      queryClient.invalidateQueries(reviewKeys.reviews(productId));
    },
  });
};
