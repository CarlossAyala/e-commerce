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
    enabled: Boolean(id),
  });
};

export const useGetAllCategories = () => {
  const values = useQuery({
    queryKey: categoryKeys.findAll(),
    queryFn: findAll,
  });

  return {
    categories: values.data,
    isEmpty: values.data?.length === 0,
    ...values,
  };
};

export const useGetCategories = (query = "") => {
  const values = useQuery({
    queryKey: categoryKeys.findAllAndCount(query),
    queryFn: () => findAllAndCount(query),
  });

  return {
    categories: values.data?.rows,
    isEmpty: values.data?.rows.length === 0,
    ...values,
  };
};
