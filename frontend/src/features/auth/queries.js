import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { createQueryKey, getCurrentApp } from "@/shared/utils";
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
  key: (app) => {
    return createQueryKey({
      prefix: "auth",
      entity: app,
      config: {
        removeOnSignout: true,
      },
    });
  },
  accessToken: (app) => [...authKeys.key(app), "access-token"],
  profile: (app) => [...authKeys.key(app), "profile"],
};

export const useAuth = (pathname) => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const { app } = getCurrentApp(pathname ?? location.pathname);

  const query = useQuery({
    queryKey: authKeys.accessToken(app),
    queryFn: () => getAccessToken(app),
    refetchInterval: ms("1h"),
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (!query.isError) return;
    const { status } = query.error;

    if ([401, 403].includes(status)) {
      queryClient.invalidateQueries(authKeys.key(app));
    }
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
    onSuccess: async () => {
      const predicate = (query) => {
        const { queryKey } = query;
        const [prefix, entity, { removeOnSignout }] = queryKey;

        const fromAuth = prefix === "auth" && entity === app;
        const fromEntity = prefix === app && removeOnSignout;

        return fromAuth || fromEntity;
      };

      await queryClient.resetQueries(
        {
          type: "all",
          predicate,
        },
        { cancelRefetch: true, throwOnError: false },
      );
      queryClient.removeQueries({
        type: "all",
        predicate,
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
