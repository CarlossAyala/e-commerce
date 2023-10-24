export const requestOfficialStoreStatus = {
  process: "in process",
  approved: "approved",
  rejected: "rejected",
};
export const requestOfficialStoreActionRoutes = {
  root: "/admin/official-stores",
  history: (storeId) => `/admin/official-stores/${storeId}/history`,
  details: (requestId) => `/admin/official-stores/${requestId}/details`,
};
