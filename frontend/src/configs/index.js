// Config Backend API
export const API_URL = "http://localhost:3005";
export const API_CUSTOMER = `${API_URL}/customer/api`;
export const API_SELLER = `${API_URL}/seller/api`;
export const API_COMMON = `${API_URL}/api/common`;

export const actionRoutes = {
  signin: "/signin",
  signup: "/signup",
  signout: "/signout",
  seller: {
    dashboard: "/seller",
  },
};
