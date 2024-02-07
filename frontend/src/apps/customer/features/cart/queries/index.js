import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  getCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../api";

export const cartKeys = {
  key: ["cart"],
};

export const useGetCart = () => {
  const values = useQuery({
    queryKey: cartKeys.key,
    queryFn: async () => {
      const data = await getCart();
      const cart = data.map((item) => ({
        ...item,
        product: {
          ...item.product,
          price: +item.product.price,
        },
        visible: true,
      }));

      return cart;
    },
  });

  const quantity = values.data?.length ?? 0;
  const subTotalVisible =
    values.data?.reduce((acum, item) => {
      if (item.visible) return acum + item.product.price * item.quantity;

      return acum;
    }, 0) ?? 0;
  const subTotalHidden =
    values.data?.reduce((acum, item) => {
      if (!item.visible) return acum + item.product.price * item.quantity;

      return acum;
    }, 0) ?? 0;

  const subTotal = subTotalHidden > 0 ? subTotalHidden + subTotalVisible : 0;

  return {
    cart: values.data,
    hasContent: values.data?.length > 0,
    quantity,
    subTotal,
    subTotalVisible,
    subTotalHidden,
    ...values,
  };
};

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }) => addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.key,
      });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
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

  return useMutation({
    mutationFn: ({ productId, quantity }) =>
      updateQuantity(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};

export const useUpdateVisibility = () => {
  const queryClient = useQueryClient();

  return (productId) => {
    queryClient.setQueryData(cartKeys.key, (oldData) => {
      if (!oldData) return oldData;

      const newData = oldData.map((item) => {
        if (item.productId === productId) {
          item.visible = !item.visible;
        }

        return item;
      });

      return newData;
    });
  };
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.key);
    },
  });
};
