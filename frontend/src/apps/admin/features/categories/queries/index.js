import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  findMixed,
  create,
  attach,
  findOne,
  update,
  remove,
  detach,
} from "../api";

const categoryKeys = {
  key: ["admin/category"],
  findMixed: () => [...categoryKeys.key, "find-mixed"],
  findOne: (id) => [...categoryKeys.key, "find-one", id],
};

export const useGetMixCategories = () => {
  return useQuery({
    queryKey: categoryKeys.findMixed(),
    queryFn: () => findMixed(),
  });
};

export const useGetCategory = (id) => {
  return useQuery({
    queryKey: categoryKeys.findOne(id),
    queryFn: () => findOne(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findMixed(),
      });
    },
  });
};

export const useAttachCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: attach,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findMixed(),
      });
    },
  });
};

export const useDetachCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: detach,
    onSuccess: (_, { categoryId }) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findOne(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findMixed(),
      });
    },
  });
};

export const useUpdateCategory = (categoryId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => update(categoryId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findOne(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findMixed(),
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: (_, categoryId) => {
      queryClient.removeQueries({
        queryKey: categoryKeys.findOne(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.findMixed(),
      });
    },
  });
};
