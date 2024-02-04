import { useQuery } from "@tanstack/react-query";
import {
  findProductsBestSellers,
  findFull,
  findList,
  findMain,
  findOne,
  findProductsRandoms,
  findProductsTopRated,
  findStores,
} from "../api";

const categoryKeys = {
  key: ["category"],
  main: () => [...categoryKeys.key, "main"],
  full: () => [...categoryKeys.key, "full"],
  findOne: (slug) => [...categoryKeys.key, "find-one", slug],
  findList: (slug) => [...categoryKeys.key, "find-list", slug],
  bestSeller: (slug) => [...categoryKeys.key, "best-seller", slug],
  topRated: (slug) => [...categoryKeys.key, "top-rated", slug],
  random: (slug) => [...categoryKeys.key, "random", slug],
  stores: (slug) => [...categoryKeys.key, "stores", slug],
};

export const useGetMainCategories = () => {
  return useQuery({
    queryKey: categoryKeys.main(),
    queryFn: () => findMain(),
  });
};

export const useGetFullCategories = () => {
  const values = useQuery({
    queryKey: categoryKeys.full(),
    queryFn: () => findFull(),
  });

  return {
    categories: values.data,
    hasContent: values.data?.length > 0,
    ...values,
  };
};

export const useGetCategory = (slug) => {
  return useQuery({
    queryKey: categoryKeys.findOne(slug),
    queryFn: () => findOne(slug),
    enabled: !!slug,
  });
};

export const useGetListCategories = (slug) => {
  const value = useQuery({
    queryKey: categoryKeys.findList(slug),
    queryFn: () => findList(slug),
    enabled: !!slug,
  });

  return {
    category: value.data,
    ...value,
  };
};

export const useGetBestSellerCategory = (slug) => {
  const values = useQuery({
    queryKey: categoryKeys.bestSeller(slug),
    queryFn: () => findProductsBestSellers(slug),
    enabled: !!slug,
  });

  return {
    products: values.data,
    hasContent: values.data?.length > 0,
    ...values,
  };
};

export const useGetTopRatedCategory = (slug) => {
  const values = useQuery({
    queryKey: categoryKeys.topRated(slug),
    queryFn: () => findProductsTopRated(slug),
    enabled: !!slug,
  });

  return {
    products: values.data,
    hasContent: values.data?.length > 0,
    ...values,
  };
};

export const useGetRandomsCategory = (slug) => {
  const values = useQuery({
    queryKey: categoryKeys.random(slug),
    queryFn: () => findProductsRandoms(slug),
    enabled: !!slug,
  });

  return {
    products: values.data,
    hasContent: values.data?.length > 0,
    ...values,
  };
};

export const useGetStoresCategory = (slug) => {
  const values = useQuery({
    queryKey: categoryKeys.stores(slug),
    queryFn: () => findStores(slug),
    enabled: !!slug,
  });

  return {
    stores: values.data,
    hasContent: values.data?.length > 0,
    ...values,
  };
};
