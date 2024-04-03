import { useQuery } from "@tanstack/react-query";
import { parseURLSearchParams } from "@/shared/utils";
import { findOne, getAll, findAll } from "../api";

const categoryKeys = {
  key: ["category"],
  findOne: (id) => [...categoryKeys.key, "find-one", id],
  getAll: () => [...categoryKeys.key, "get-all"],
  findAll: (query) => [...categoryKeys.key, "find-all", query],
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
    queryKey: categoryKeys.getAll(),
    queryFn: getAll,
  });
};

export const useGetCategories = (query) => {
  const _query = parseURLSearchParams(query);

  return useQuery({
    queryKey: categoryKeys.findAll(_query),
    queryFn: () => findAll(query),
  });
};
