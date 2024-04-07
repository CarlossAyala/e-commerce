import { useQuery } from "@tanstack/react-query";
import { findOne, getAll } from "./api";

const categoryKeys = {
  key: ["shared/category"],
  findOne: (id) => [...categoryKeys.key, "find-one", id],
  getAll: () => [...categoryKeys.key, "get-all"],
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: categoryKeys.findOne(id),
    queryFn: () => findOne(id),
    enabled: !!id,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryKeys.getAll(),
    queryFn: getAll,
  });
};
