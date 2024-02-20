import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { localStorageManager } from "../../../utils/local-storage";
import {
  getNewAccessToken,
  getProfile,
  signin,
  signup,
  updateFullName,
  updatePassword,
} from "../api";
import { SessionStorage } from "@/utils";

export const authKeys = {
  key: ["auth"],
  accessToken: () => [...authKeys.key, "access-token"],
  profile: () => [...authKeys.key, "profile"],
};

export const useAccessToken = () => {
  const attemptSilentAuth = SessionStorage.get("attempt_silent_auth");

  console.log({ attemptSilentAuth });
  return useQuery({
    queryKey: authKeys.accessToken(),
    queryFn: getNewAccessToken,
    staleTime: 1000 * 60 * 4.5,
    retry: false,
    enabled: !attemptSilentAuth,
  });
};

export const useGetProfile = () => {
  const { data: accessToken } = useAccessToken();

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => getProfile({ accessToken }),
    retry: false,
    enabled: !!accessToken,
  });
};

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => signin(values),
    onSuccess: ({ accessToken }) => {
      queryClient.setQueryData(authKeys.accessToken(), accessToken);
      queryClient.invalidateQueries(authKeys.profile());
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

  return () => {
    localStorageManager.removeToken();
    queryClient.invalidateQueries(authKeys.key);
  };
};

export const useAdminAuth = () => {
  const { data: admin, isLoading, ...rest } = useGetProfile("from=admin");

  return {
    admin,
    isLoading,
    isAuthenticated: !!admin,
    ...rest,
  };
};

export const useSellerAuth = () => {
  const { data: seller, isLoading, ...rest } = useGetProfile("from=seller");

  return {
    seller,
    isLoading,
    isAuthenticated: !!seller,
    ...rest,
  };
};

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
