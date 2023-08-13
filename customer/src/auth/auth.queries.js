import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from './auth.api';
import { getToken, removeToken, setToken } from '../api';

export const authKeys = {
  key: ['auth'],
  profile: () => [...authKeys.key, 'profile'],
};

export const useGetProfile = () => {
  const queryClient = useQueryClient();
  const tokenLS = getToken();

  return useQuery({
    enabled: Boolean(tokenLS),
    queryKey: authKeys.profile(),
    queryFn: () => API.getProfile(),
    onError: () => {
      removeToken();

      queryClient.setQueryData(authKeys.profile(), null);
    },
    retry: false,
  });
};

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => API.signin(data),
    onSuccess: ({ token, customer }) => {
      setToken(token);

      queryClient.setQueryData(authKeys.profile(), customer);
    },
    onError: () => {
      removeToken();

      queryClient.setQueryData(authKeys.profile(), null);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data) => API.signup(data),
  });
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  removeToken();
  queryClient.setQueryData(authKeys.profile(), null);
};

export const useChangeName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => API.changeName(data),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.profile(), data);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => API.changePassword(data),
  });
};
