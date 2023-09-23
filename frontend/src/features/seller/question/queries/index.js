import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { findAll, findAllByProductId, findOne, reject, reply } from "../api";

export const questionKeys = {
  key: ["question"],
  findOne: (questionId) => [...questionKeys.key, "find-one", questionId],
  findAll: (query) => [...questionKeys.key, "find-all", query],
  findAllByProductId: (productId, query) => [
    ...questionKeys.key,
    "find-all-by-product-id",
    productId,
    query,
  ],
};

export const useGetQuestion = (questionId) => {
  return useQuery({
    queryKey: questionKeys.findOne(questionId),
    queryFn: () => findOne(questionId),
    enabled: Boolean(questionId),
  });
};

export const useGetQuestions = (query = "") => {
  return useQuery({
    queryKey: questionKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};

export const useGetQAsByProductId = (productId, query = "") => {
  return useQuery({
    queryKey: questionKeys.findAllByProductId(productId, query),
    queryFn: () => findAllByProductId(productId, query),
    enabled: Boolean(productId),
  });
};

export const useReplyQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([questionId, answer]) => reply(questionId, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.key,
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
        queryKey: questionKeys.key,
      });
    },
  });
};
