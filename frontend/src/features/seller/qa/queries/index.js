import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAll, findAllByProductId, findOne, reject, reply } from "../api";

export const qaKeys = {
  key: ["qa"],
  findOne: (questionId) => [...qaKeys.key, "find-one", questionId],
  findAll: (query) => [...qaKeys.key, "find-all", query],
  findAllByProductId: (productId) => [
    ...qaKeys.key,
    "find-all-by-product-id",
    productId,
  ],
};

export const useGetQuestion = (questionId) => {
  return useQuery({
    queryKey: qaKeys.findOne(questionId),
    queryFn: () => findOne(questionId),
    enabled: Boolean(questionId),
  });
};

export const useGetQAs = (query) => {
  return useQuery({
    queryKey: qaKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};

export const useGetQAsByProductId = (productId) => {
  return useQuery({
    queryKey: qaKeys.findAllByProductId(productId),
    queryFn: () => findAllByProductId(productId),
    enabled: Boolean(productId),
  });
};

export const useReplyQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([questionId, answer]) => reply(questionId, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};

export const useRejectQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId) => reject(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};
