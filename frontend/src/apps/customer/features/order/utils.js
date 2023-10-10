export const orderActionRoutes = {
  list: "/customer/orders",
  details: (id) => `/customer/orders/${id}/details`,
};

export const getOrderQty = (order) => {
  return order.items.reduce((acc, item) => acc + item.quantity, 0);
};
