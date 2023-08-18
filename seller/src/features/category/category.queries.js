import { useQuery } from "@tanstack/react-query";
import API from "./category.api";

const categoryKeys = {
  key: ["category"],
  get: (id) => [...categoryKeys.key, "get", id],
  getAll: (search) => [...categoryKeys.key, "get-all", search],
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: categoryKeys.get(id),
    queryFn: () => API.get(id),
    enabled: Boolean(id),
  });
};

export const useGetCategories = (params) => {
  return useQuery({
    queryKey: categoryKeys.getAll(params),
    queryFn: () => API.getAll(params),
  });
};
