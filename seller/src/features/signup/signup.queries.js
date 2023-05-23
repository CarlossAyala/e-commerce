import { useMutation } from 'react-query';
import API from './signup.api';

export const useSignup = () => {
  return useMutation({
    mutationFn: (values) => API.signup(values),
  });
};
