import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { addToCart, getCart, removeFromCart, updateQuantity } from "./api";
import { createQueryKey } from "@/shared/utils";

export const cartKeys = {
  key: createQueryKey({
    prefix: "ecommerce",
    entity: "cart",
    config: {
      removeOnSignout: true,
    },
  }),
};

export const useGetCart = () => {
  const { data: accessToken } = useAuth();

  return useQuery({
    queryKey: cartKeys.key,
    queryFn: () => getCart(accessToken),
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ productId, quantity }) => {
      return addToCart(productId, quantity, accessToken);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: (productId) => removeFromCart(productId, accessToken),
    onSuccess: (_, productId) => {
      queryClient.setQueryData(cartKeys.key, (oldData) => {
        if (!oldData) return oldData;

        const newData = oldData.filter((item) => item.productId !== productId);

        return newData;
      });
    },
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  const { data: accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ productId, quantity }) => {
      return updateQuantity(productId, quantity, accessToken);
    },
    onSuccess: (_, { productId, quantity }) => {
      queryClient.setQueryData(cartKeys.key, (oldData) => {
        if (!oldData) return oldData;

        const newData = oldData.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity };
          }
          return item;
        });

        return newData;
      });
    },
  });
};
