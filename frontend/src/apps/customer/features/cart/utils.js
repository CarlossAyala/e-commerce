export const getTotalsCart = (cart) => {
  let visible = 0;
  let hidden = 0;
  let both = 0;

  if (!Array.isArray(cart) || cart.length === 0) return [visible, hidden, both];

  cart.forEach((item) => {
    if (item.visible) visible += item.quantity * item.product.price;
    else hidden += item.quantity * item.product.price;

    both += item.quantity * item.product.price;
  });

  return [visible, hidden, both];
};

export const getQtyCart = (cart) => {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  return cart.reduce((acum, cart) => {
    return acum + cart.quantity;
  }, 0);
};
