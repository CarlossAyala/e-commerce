export const requestOfficialStoreStatus = {
  process: "in process",
  approved: "approved",
  rejected: "rejected",
};
export const requestOfficialStoreActionRoutes = {
  root: "/admin/request-official-stores",
  history: (storeId) => `/admin/request-official-stores/${storeId}/history`,
  details: (requestId) => `/admin/request-official-stores/${requestId}/details`,
};
