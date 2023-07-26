import { useMutation } from '@tanstack/react-query';
import API from './signin.api';

export const useSignin = () => {
  return useMutation({
    mutationFn: (values) => API.signin(values),
  });
};
