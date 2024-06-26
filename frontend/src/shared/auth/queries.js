import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { getCurrentApp } from "@/shared/utils";
import {
  getAccessToken,
  getProfile,
  signin,
  signout,
  signup,
  updateProfile,
  updatePassword,
} from "./api";

export const authKeys = {
  key: (app) => ["auth", app],
  accessToken: (app) => [...authKeys.key(app), "access-token"],
  profile: (app) => [...authKeys.key(app), "profile"],
};

export const useAuth = (pathname) => {
  const location = useLocation();

  const { app } = getCurrentApp(pathname ?? location.pathname);

  const query = useQuery({
    queryKey: authKeys.accessToken(app),
    queryFn: () => getAccessToken(app),
    refetchInterval: ms("1h"),
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    // TODO: Fix this
    // if (query.isError) {
    //   queryClient.setQueriesData(authKeys.accessToken(app), null);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isError]);

  return query;
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
    mutationFn: () => signout(app),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [authKeys.key(app)],
      });
      queryClient.removeQueries({
        queryKey: [app],
      });
    },
    meta: {
      title: "Signout",
    },
  });
};

export const useUpdateProfile = () => {
  const { data: accessToken } = useAuth();
  const queryClient = useQueryClient();
  const { app } = getCurrentApp();

  return useMutation({
    mutationFn: (data) => updateProfile(data, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries(authKeys.profile(app));
    },
    meta: {
      title: "Account",
    },
  });
};

export const useUpdatePassword = () => {
  const { data: accessToken } = useAuth();
  const queryClient = useQueryClient();
  const { app } = getCurrentApp();

  return useMutation({
    mutationFn: (data) => updatePassword(data, accessToken),
    onSuccess: () => {
      return queryClient.invalidateQueries(authKeys.accessToken(app));
    },
    meta: {
      title: "Account",
    },
  });
};
