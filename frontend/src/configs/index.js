// Config Backend API
export const API_URL = "http://localhost:3005";
export const API_CUSTOMER = `${API_URL}/customer/api`;
export const API_SELLER = `${API_URL}/seller/api`;
export const API_COMMON = `${API_URL}/api/common`;
export const API_AUTH = `${API_URL}/api/auth`;

export const appActionRoutes = {
  signin: "/signin",
  signup: "/signup",
  signout: "/signout",
  admin: "/admin",
  seller: "/seller",
  customer: "/customer",
  landing: "/",
};
