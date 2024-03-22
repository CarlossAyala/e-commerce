export const cartActionsRoutes = {
  root: "/cart",
};

export const calcSubTotal = (cart) => {
  return (
    cart?.reduce((acum, item) => {
      if (item.visible) return acum + +item.product.price * item.quantity;

      return acum;
    }, 0) ?? 0
  );
};
