import { useQuery } from '@tanstack/react-query';
import API from './category.api';

const categoryKeys = {
  key: ['category'],
  search: (search) => [...categoryKeys.key, 'search', search],
};

export const useSearchCategories = (params) => {
  return useQuery({
    queryKey: categoryKeys.search(params),
    queryFn: () => API.search(params),
  });
};
