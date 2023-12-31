import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { localStorageManager } from "../../../utils/local-storage";
import {
  getProfile,
  signin,
  signup,
  updateFullName,
  updatePassword,
} from "../api";
import { getProfileQuery } from "../utils";

export const authKeys = {
  key: ["auth"],
  profile: (query) => [...authKeys.key, "profile", query],
};

export const useGetProfile = (query) => {
  return useQuery({
    queryKey: authKeys.profile(query),
    queryFn: () => getProfile(query),
    retry: false,
  });
};

/**
 * @param {import("../utils.js").Profile} profile
 */
export const useSignin = (profile) => {
  const queryClient = useQueryClient();
  const query = getProfileQuery(profile);

  return useMutation({
    mutationFn: (values) => signin(values, query),
    onSuccess: ({ token }) => {
      localStorageManager.setToken(token);
      queryClient.invalidateQueries(authKeys.key);
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

  return () => {
    localStorageManager.removeToken();
    queryClient.invalidateQueries(authKeys.key);
  };
};

export const useAdminAuth = () => {
  const { data: admin, isLoading } = useGetProfile("from=admin");

  return {
    admin,
    isLoading,
    isAuthenticated: !!admin,
  };
};

export const useSellerAuth = () => {
  const { data: seller, isLoading } = useGetProfile("from=seller");

  return {
    seller,
    isLoading,
    isAuthenticated: !!seller,
  };
};

export const useCustomerAuth = () => {
  const { data: customer, isLoading } = useGetProfile("from=customer");

  return {
    customer,
    isLoading,
    isAuthenticated: !!customer,
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFullName,
    onSuccess: () => {
      queryClient.invalidateQueries(authKeys.key);
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};
