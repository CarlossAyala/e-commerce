import { useMutation } from '@tanstack/react-query';
import API from './signup.api';

export const useSignup = () => {
  return useMutation({
    mutationFn: (values) => API.signup(values),
    onSuccess: () => {
      console.log('Account created');
    },
    onError: (error) => {
      console.log('Error creating account', error);
    },
  });
};
