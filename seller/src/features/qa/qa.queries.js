import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./qa.api";

export const qaKeys = {
  key: ["qa"],
  get: (id) => [...qaKeys.key, "get", id],
  getList: (productId) => [...qaKeys.key, "get-list", productId],
  getAll: (query = "") => [...qaKeys.key, "get-all", query],
};

export const useGetQAAll = (query) => {
  return useQuery({
    queryKey: qaKeys.getAll(query),
    queryFn: () => API.getAll(query),
  });
};

export const useGetQAList = (productId) => {
  return useQuery({
    queryKey: qaKeys.getList(productId),
    queryFn: () => API.getList(productId),
    enabled: Boolean(productId),
  });
};

export const useGetQA = (id) => {
  return useQuery({
    queryKey: qaKeys.get(id),
    queryFn: () => API.get(id),
    enabled: Boolean(id),
  });
};

export const useReplyQA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([questionId, answer]) => API.reply(questionId, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};

export const useRejectQA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ([questionId]) => API.reject(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qaKeys.key,
      });
    },
  });
};
