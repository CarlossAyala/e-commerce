export const totalVisibles = (cart) => {
  if (!cart || cart.length === 0) return 0;

  return cart.reduce((acc, item) => {
    if (item.visible) return acc + item.quantity * item.product.price;
    else return acc;
  }, 0);
};

export const totalHiddens = (cart) => {
  if (!cart || cart.length === 0) return 0;

  return cart.reduce((acc, item) => {
    if (!item.visible) return acc + item.quantity * item.product.price;
    else return acc;
  }, 0);
};
