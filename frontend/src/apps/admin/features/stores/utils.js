export const STORE_VERIFY_STATUS = {
  queue: "queue",
  approved: "approved",
  rejected: "rejected",
};

export const storeActionRoutes = {
  root: "/admin/stores",
  requestsVerify: "/admin/stores/requests-verify",
  requestVerify: (requestId) => `/admin/stores/requests-verify/${requestId}`,
  store: (storeId) => `/admin/stores/${storeId}`,
  storeRequestsVerify: (storeId) => `/admin/stores/${storeId}/requests-verify`,
};
