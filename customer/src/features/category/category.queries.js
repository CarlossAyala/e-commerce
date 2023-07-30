import { useQuery } from '@tanstack/react-query';
import API from './category.api';

const categoryKeys = {
  key: ['category'],
  main: () => [...categoryKeys.key, 'main'],
  withParams: (params) => [...categoryKeys.key, 'params', params],
};

export const useGetMainCategories = () => {
  return useQuery({
    queryKey: categoryKeys.main(),
    queryFn: () => API.getMains(),
  });
};
