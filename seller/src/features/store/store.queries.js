import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "./store.api";
import { getToken } from "../../api";

export const storeKeys = {
  key: ["store"],
  getStats: () => [...storeKeys.key, "stats"],
};

export const useGetStore = () => {
  const token = getToken();

  return useQuery({
    queryKey: storeKeys.key,
    queryFn: () => API.getStore(),
    enabled: Boolean(token),
  });
};

export const useNewStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.createStore(values),
    onSuccess: () => {
      console.log("Store created successfully");

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useChangeName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.changeName(values),
    onSuccess: () => {
      console.log("Store updated successfully");

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useChangeDescription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.changeDescription(values),
    onSuccess: () => {
      console.log("Store updated successfully");

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => API.deleteStore(),
    onSuccess: () => {
      console.log("Store deleted successfully");

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useGetStoreStats = () => {
  return useQuery({
    queryKey: storeKeys.getStats(),
    queryFn: () => API.getStats(),
  });
};
