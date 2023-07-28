import { useMutation } from '@tanstack/react-query';
import API from './auth.api';

export const authKeys = {
  key: ['auth'],
};

export const useGetProfile = () => {
  return useMutation({
    mutationFn: () => API.getProfile(),
  });
};