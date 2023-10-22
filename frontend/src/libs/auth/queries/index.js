import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeToken, setToken } from "../../../utils/local-storage";
import {
  getProfile,
  signin,
  signup,
  updateFullName,
  updatePassword,
} from "../api";
import { useEffect } from "react";

export const authKeys = {
  key: ["auth"],
  profile: (query) => [...authKeys.key, "profile", query],
};

export const useGetProfile = (query = "") => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: authKeys.profile(query),
    queryFn: () => getProfile(query),
    retry: false,
  });

  useEffect(
    function ErrorHandler() {
      if (result.error) {
        removeToken();
        queryClient.setQueryData(authKeys.profile(), null);
      }
    },
    [result.error, queryClient],
  );

  return result;
};

export const useGetAdminProfile = () => {
  return useGetProfile("from=admin");
};

export const useSignin = (query) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => signin(values, query),
    onSuccess: ({ token, user }) => {
      console.log("Success");
      setToken(token);
      queryClient.setQueryData(authKeys.profile(), user);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useSignout = () => {
  const queryClient = useQueryClient();

  removeToken();
  queryClient.setQueryData(authKeys.profile(), null);
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const profile = queryClient.getQueryData(authKeys.profile());

  return profile;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFullName,
    onSuccess: () => {
      queryClient.invalidateQueries(authKeys.profile());
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};
