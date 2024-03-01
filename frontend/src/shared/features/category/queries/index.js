import { useQuery } from "@tanstack/react-query";
import { findOne, findAll, findAllAndCount } from "../api";

const categoryKeys = {
  key: ["category"],
  findOne: (id) => [...categoryKeys.key, "find-one", id],
  findAll: () => [...categoryKeys.key, "find-all"],
  findAllAndCount: (query) => [
    ...categoryKeys.key,
    "find-all-and-count",
    query,
  ],
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: categoryKeys.findOne(id),
    queryFn: () => findOne(id),
    enabled: !!id,
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: categoryKeys.findAll(),
    queryFn: findAll,
  });
};

export const useGetCategories = (query = "") => {
  return useQuery({
    queryKey: categoryKeys.findAllAndCount(query),
    queryFn: () => findAllAndCount(query),
  });
};
