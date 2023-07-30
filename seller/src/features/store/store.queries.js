import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from './store.api';

const storeKeys = {
  key: ['store'],
  // allFilter: (filters = {}) => [...storeKeys.key, 'all', filters],
};

export const useGetStore = () => {
  return useQuery({
    queryKey: storeKeys.key,
    queryFn: () => API.getStore(),
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.createStore(values),
    onSuccess: () => {
      console.log('Store created successfully');

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useCheckDuplicateName = () => {
  return useMutation({
    mutationFn: (values) => API.checkDuplicateName(values),
  });
};

export const useChangeName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.changeName(values),
    onSuccess: () => {
      console.log('Store updated successfully');

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useChangeDesc = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => API.changeDescription(values),
    onSuccess: () => {
      console.log('Store updated successfully');

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => API.deleteStore(),
    onSuccess: () => {
      console.log('Store deleted successfully');

      queryClient.invalidateQueries({
        queryKey: storeKeys.key,
      });
    },
  });
};
