export const STORE_VERIFY_STATUS = {
  queue: "queue",
  approved: "approved",
  rejected: "rejected",
};

export const storeActionRoutes = {
  root: "/admin/stores",
  store: (storeId) => `/admin/stores/${storeId}`,
};
