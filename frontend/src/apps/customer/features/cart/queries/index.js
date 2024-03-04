import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formatter } from "@/utils";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../api";
import { useAuth } from "@/shared/auth";

export const cartKeys = {
  key: ["customer/cart"],
};

export const useGetCart = () => {
  const { accessToken } = useAuth();

  const values = useQuery({
    queryKey: cartKeys.key,
    queryFn: async () => {
      const data = await getCart(accessToken);
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
  const subTotal =
    values.data?.reduce((acum, item) => {
      if (item.visible) return acum + item.product.price * item.quantity;

      return acum;
    }, 0) ?? 0;
  const subTotalHidden =
    values.data?.reduce((acum, item) => {
      if (!item.visible) return acum + item.product.price * item.quantity;

      return acum;
    }, 0) ?? 0;

  const subTotalPlusHidden = subTotalHidden > 0 ? subTotalHidden + subTotal : 0;

  return {
    cart: values.data,
    isEmpty: values.data?.length === 0,
    quantity,
    subTotal: Formatter.currency(subTotal),
    subTotalHidden: Formatter.currency(subTotalHidden),
    subTotalPlusHidden: Formatter.currency(subTotalPlusHidden),
    ...values,
  };
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

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
  const { accessToken } = useAuth();

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
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: ({ productId, quantity }) => {
      return updateQuantity(productId, quantity, accessToken);
    },
    onSuccess: (_, { productId, quantity }) => {
      queryClient.setQueryData(cartKeys.key, (oldData) => {
        if (!oldData) return oldData;

        const newData = oldData.map((item) => {
          if (item.productId === productId) {
            item.quantity = quantity;
          }

          return item;
        });

        return newData;
      });
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
