import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { findAll, findAllByProductId, findOne, reject, reply } from "../api";

export const qaKeys = {
  key: ["seller/qa"],
  findOne: (questionId) => [...qaKeys.key, "find-one", questionId],
  findAll: (query) => [...qaKeys.key, "find-all", query],
  findAllByProductIdKey: (productId) => [
    ...qaKeys.key,
    "find-all-by-product-id",
    productId,
  ],
  findAllByProductId: (productId, query) => [
    ...qaKeys.findAllByProductIdKey(productId),
    query,
  ],
};

export const useGetQuestion = (questionId) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: qaKeys.findOne(questionId),
    queryFn: () => findOne(questionId, accessToken),
    enabled: !!questionId,
  });
};

export const useGetQA = (query) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: qaKeys.findAll(query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetQAByProductId = (productId, query) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: qaKeys.findAllByProductId(productId, query),
    queryFn: () => findAllByProductId(productId, query, accessToken),
    enabled: !!productId,
  });
};

export const useReplyQuestion = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ questionId, values }) => {
      return reply(questionId, values, accessToken);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};

export const useRejectQuestion = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (questionId) => reject(questionId, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};
