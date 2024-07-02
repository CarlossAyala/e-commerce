import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { createQueryKey } from "@/shared/utils";
import {
  getAll,
  create,
  attach,
  findOne,
  update,
  remove,
  detach,
  count,
} from "./api";

const categoryKeys = {
  key: createQueryKey({
    prefix: "admin",
    entity: "categories",
  }),
  getAll: () => [...categoryKeys.key, "get-all"],
  findOne: (categoryId) => [...categoryKeys.key, "find-one", categoryId],
  count: () => [...categoryKeys.key, "count"],
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
      return queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
    meta: {
      title: "Category",
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
      return queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
    meta: {
      title: "Category",
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
    meta: {
      title: "Category",
    },
  });
};

export const useUpdateCategory = (categoryId) => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (formData) => update(categoryId, formData, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findOne(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.getAll(),
      });
    },
    meta: {
      title: "Category",
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
    meta: {
      title: "Category",
    },
  });
};

export const useGetCategoriesCount = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: categoryKeys.count(),
    queryFn: () => count(accessToken),
  });
};
