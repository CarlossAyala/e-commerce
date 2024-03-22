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

export const authKeys = {
  key: ["auth"],
  accessToken: () => [...authKeys.key, "access-token"],
  profile: () => [...authKeys.key, "profile"],
};

export const useAuth = () => {
  const { data: accessToken, isLoading } = useQuery({
    queryKey: authKeys.accessToken(),
    queryFn: async () => {
      const data = await getAccessToken();

      return data.accessToken;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5m
    refetchInterval: 1000 * 60 * 4, // 4m
    refetchIntervalInBackground: true,
  });

  return {
    isAuthenticated: !!accessToken,
    accessToken,
    isLoading,
  };
};

export const useGetProfile = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => getProfile(accessToken),
    enabled: !!accessToken,
  });
};

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => signin(values),
    onSuccess: ({ accessToken }) => {
      queryClient.setQueriesData(authKeys.accessToken(), accessToken);
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

  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.setQueriesData(authKeys.accessToken(), null);
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
