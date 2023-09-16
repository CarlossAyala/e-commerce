import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeToken, setToken } from "../../../utils/local-storage";
import { getProfile, signin, signup } from "../api";
import { useNavigate } from "react-router-dom";

export const authKeys = {
  key: ["auth"],
  profile: () => [...authKeys.key, "profile"],
};

export const useGetProfile = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => getProfile(),
    onError: () => {
      removeToken();

      queryClient.setQueryData(authKeys.profile(), null);
    },
    retry: false,
  });
};

export const useSignin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signin,
    onSuccess: ({ token, customer }) => {
      setToken(token);
      queryClient.setQueryData(authKeys.profile(), customer);

      navigate("/seller");
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  removeToken();
  queryClient.setQueryData(authKeys.profile(), null);
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const profile = queryClient.getQueryData(authKeys.profile());

  return profile;
};
