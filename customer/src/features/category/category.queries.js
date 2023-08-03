import { useQuery } from '@tanstack/react-query';
import API from './category.api';

const categoryKeys = {
  key: ['category'],
  main: () => [...categoryKeys.key, 'main'],
  withParams: (params) => [...categoryKeys.key, 'params', params],
  categoriesFullList: () => [...categoryKeys.key, 'categories-full-list'],
  category: (slug) => [...categoryKeys.key, 'slug', slug],
  categoryFullList: (slug) => [...categoryKeys.key, 'category-full-list', slug],
  random: (slug) => [...categoryKeys.key, 'random', slug],
  bestSellers: (slug) => [...categoryKeys.key, 'best-sellers', slug],
  topRated: (slug) => [...categoryKeys.key, 'top-rated', slug],
  stores: (slug) => [...categoryKeys.key, 'stores', slug],
};

// TODO: Change name
export const useGetMainCategories = () => {
  return useQuery({
    queryKey: categoryKeys.main(),
    queryFn: () => API.getMains(),
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: categoryKeys.categoriesFullList(),
    queryFn: () => API.getCategoriesFullList(),
  });
};

export const useGetCategory = (slug) => {
  return useQuery({
    queryKey: categoryKeys.category(slug),
    queryFn: () => API.getCategory(slug),
    enabled: Boolean(slug),
  });
};

export const useGetCategoryFullList = (slug) => {
  return useQuery({
    queryKey: categoryKeys.categoryFullList(slug),
    queryFn: () => API.getBySlugList(slug),
    enabled: Boolean(slug),
  });
};

export const useGetCategoryRandom = (slug) => {
  return useQuery({
    queryKey: categoryKeys.random(slug),
    queryFn: () => API.getRandom(slug),
    enabled: Boolean(slug),
  });
};

export const useGetCategoryBestSellers = (slug) => {
  return useQuery({
    queryKey: categoryKeys.bestSellers(slug),
    queryFn: () => API.getBestSellers(slug),
    enabled: Boolean(slug),
  });
};

export const useGetCategoryTopRated = (slug) => {
  return useQuery({
    queryKey: categoryKeys.topRated(slug),
    queryFn: () => API.getTopRated(slug),
    enabled: Boolean(slug),
  });
};

export const useGetCategoryStores = (slug) => {
  return useQuery({
    queryKey: categoryKeys.stores(slug),
    queryFn: () => API.getStores(slug),
    enabled: Boolean(slug),
  });
};
