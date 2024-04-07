import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth";
import { getAll, create, attach, findOne, update, remove, detach } from "./api";

const categoryKeys = {
  key: ["admin/category"],
  getAll: () => [...categoryKeys.key, "get-all"],
  findOne: (categoryId) => [...categoryKeys.key, "find-one", categoryId],
};

export const useGetCategories = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: categoryKeys.getAll(),
    queryFn: () => getAll(accessToken),
  });
};

export const useGetCategory = (categoryId) => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: categoryKeys.findOne(categoryId),
    queryFn: () => findOne(categoryId, accessToken),
    enabled: !!categoryId,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => create(values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
  });
};

export const useAttachCategory = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ categoryId, values }) => {
      return attach(categoryId, values, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
  });
};

export const useDetachCategory = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ categoryId, values }) => {
      return detach(categoryId, values, accessToken);
    },
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findOne(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
  });
};

export const useUpdateCategory = (categoryId) => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (values) => update(categoryId, values, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findOne(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (categoryId) => remove(categoryId, accessToken),
    onSuccess: (_, categoryId) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findOne(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
  });
};
