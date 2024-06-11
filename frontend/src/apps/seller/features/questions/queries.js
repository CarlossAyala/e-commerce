import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { parseURLSearchParams } from "@/shared/utils";
import { findAll, findAllByProductId, findOne, reject, reply } from "./api";

export const qaKeys = {
  key: ["seller/questions"],
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
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: qaKeys.findOne(questionId),
    queryFn: () => findOne(questionId, accessToken),
    enabled: !!questionId,
  });
};

export const useGetQA = (query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: qaKeys.findAll(_query),
    queryFn: () => findAll(query, accessToken),
  });
};

export const useGetQAByProductId = (productId, query) => {
  const { data: accessToken } = useAuth();
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: qaKeys.findAllByProductId(productId, _query),
    queryFn: () => findAllByProductId(productId, query, accessToken),
    enabled: !!productId,
  });
};

export const useReplyQuestion = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ questionId, values }) => {
      return reply(questionId, values, accessToken);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
    meta: {
      title: "QA",
    },
  });
};

export const useRejectQuestion = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (questionId) => reject(questionId, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
    meta: {
      title: "QA",
    },
  });
};
