export const getVisibleTotalCart = (cart) => {
  let total = 0;
  if (!Array.isArray(cart) || cart.length === 0) return total;

  return cart.reduce((acum, cart) => {
    if (!cart.visible) return acum;

    return acum + cart.quantity * cart.product.price;
  }, total);
};
export const getHiddenTotalCart = (cart) => {
  let total = 0;
  if (!Array.isArray(cart) || cart.length === 0) return total;

  return cart.reduce((acum, cart) => {
    if (cart.visible) return acum;

    return acum + cart.quantity * cart.product.price;
  }, total);
};

export const getTotalCart = (cart) => {
  let visible = 0;
  let hidden = 0;
  let both = 0;

  if (!Array.isArray(cart) || cart.length === 0) return [visible, hidden, both];

  visible = getVisibleTotalCart(cart);
  hidden = getHiddenTotalCart(cart);
  both = visible + hidden;

  return [visible, hidden, both];
};

export const getQtyCart = (cart) => {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  return cart.reduce((acum, cart) => {
    return acum + cart.quantity;
  }, 0);
};
