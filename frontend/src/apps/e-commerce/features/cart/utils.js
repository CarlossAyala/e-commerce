export const calculateTotal = (cart) => {
  return cart.reduce((acum, item) => {
    return acum + +item.product.price * item.quantity;
  }, 0);
};
