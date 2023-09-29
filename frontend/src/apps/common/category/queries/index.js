import { useQuery } from "@tanstack/react-query";
import { findAll, findOne } from "../api";

const categoryKeys = {
  key: ["category"],
  findOne: (id) => [...categoryKeys.key, "findOne", id],
  findAll: (query) => [...categoryKeys.key, "findAll", query],
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: categoryKeys.findOne(id),
    queryFn: () => findOne(id),
    enabled: Boolean(id),
  });
};

export const useGetCategories = (query = "") => {
  return useQuery({
    queryKey: categoryKeys.findAll(query),
    queryFn: () => findAll(query),
  });
};
