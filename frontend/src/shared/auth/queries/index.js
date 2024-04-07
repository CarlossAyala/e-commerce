import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAccessToken,
  getProfile,
  signin,
  signout,
  signup,
  updateFullName,
  updatePassword,
} from "../api";
import { getCurrentApp } from "@/shared/utils";
import { useLocation } from "react-router-dom";

export const authKeys = {
  key: (app) => ["auth/".concat(app)],
  accessToken: (app) => [...authKeys.key(app), "access-token"],
  profile: (app) => [...authKeys.key(app), "profile"],
};

export const useAuth = (input) => {
  const location = useLocation();
  const { app } = getCurrentApp(input ?? location.pathname);

  return useQuery({
    queryKey: authKeys.accessToken(app),
    queryFn: () => getAccessToken(app),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5m
    refetchInterval: 1000 * 60 * 4, // 4m
    refetchIntervalInBackground: true,
  });
};

export const useGetProfile = () => {
  const location = useLocation();
  const { app } = getCurrentApp(location.pathname);
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: authKeys.profile(app),
    queryFn: () => getProfile(accessToken),
    enabled: !!accessToken,
  });
};

export const useSignin = (app) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => signin(app, values),
    onSuccess: ({ accessToken }) => {
      queryClient.setQueriesData(authKeys.accessToken(app), accessToken);
    },
    meta: {
      title: "Signin",
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    meta: {
      title: "Signup",
    },
  });
};

export const useSignout = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { app } = getCurrentApp(location.pathname);

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.setQueriesData(authKeys.accessToken(app), null);
    },
    meta: {
      title: "Signout",
    },
  });
};

// export const useAdminAuth = () => {
//   const { data: admin, isLoading, ...rest } = useGetProfile("from=admin");

//   return {
//     admin,
//     isLoading,
//     isAuthenticated: !!admin,
//     ...rest,
//   };
// };

// export const useSellerAuth = () => {
//   const { data: seller, isLoading, ...rest } = useGetProfile("from=seller");

//   return {
//     seller,
//     isLoading,
//     isAuthenticated: !!seller,
//     ...rest,
//   };
// };

// export const useCustomerAuth = () => {
//   const { data: customer, ...rest } = useGetProfile();

//   return {
//     customer,
//     isAuthenticated: !!customer,
//     ...rest,
//   };
// };

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
