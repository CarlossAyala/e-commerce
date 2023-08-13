import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from './review.api';
import { getToken } from '../../api';

const reviewKeys = {
  key: ['review'],
  get: (id) => [...reviewKeys.key, 'get', id],
  done: () => [...reviewKeys.key, 'customer-done'],
  pending: () => [...reviewKeys.key, 'customer-pending'],
  productStats: (id) => [...reviewKeys.key, 'product-stats', id],
  productReviews: (id) => [...reviewKeys.key, 'product-reviews', id],
};

export const useGetReview = (reviewId) => {
  const token = getToken();

  return useQuery({
    queryKey: reviewKeys.get(reviewId),
    queryFn: () => API.getReview(reviewId),
    enabled: Boolean(token) && Boolean(reviewId),
  });
};

export const useGetCustomerDoneReviews = () => {
  const token = getToken();

  return useQuery({
    queryKey: reviewKeys.done(),
    queryFn: () => API.getCustomerDoneReviews(),
    enabled: Boolean(token),
  });
};

export const useGetCustomerPendingReviews = () => {
  const token = getToken();

  return useQuery({
    queryKey: reviewKeys.pending(),
    queryFn: () => API.getCustomerPendingReviews(),
    enabled: Boolean(token),
  });
};

export const useGetProductReviewStats = (id) => {
  return useQuery({
    queryKey: reviewKeys.productStats(id),
    queryFn: () => API.getProductStats(id),
    enabled: Boolean(id),
  });
};

export const useGetProductReviews = (id) => {
  return useQuery({
    queryKey: reviewKeys.productReviews(id),
    queryFn: () => API.getProductReviews(id),
    enabled: Boolean(id),
  });
};

export const useLikeReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([reviewId]) => API.likeReview(reviewId),
    onSuccess: (_, [, productId]) => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.productReviews(productId),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.done(),
      });
    },
  });
};

export const useDislikeReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([reviewId]) => API.dislikeReview(reviewId),
    onSuccess: (_, [, productId]) => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.productReviews(productId),
      });
      queryClient.invalidateQueries({
        queryKey: reviewKeys.done(),
      });
    },
  });
};

export const useCreateReview = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.create(reviewId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.pending(),
      });

      queryClient.invalidateQueries({
        queryKey: reviewKeys.done(),
      });
    },
  });
};
