import { useQuery, useMutation } from 'react-query';

const publishKeys = {
  key: ['publishProduct'],
  allFilter: (filters = {}) => [...publishKeys.key, 'all', filters],
};

export const useGetCategories = (filters) => {
  const params = new URLSearchParams(filters);

  return useQuery({
    queryKey: publishKeys.allFilter(params),
    queryFn: () => '',
  });
};
