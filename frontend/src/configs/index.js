// Config Backend API
export const API_URL = "http://localhost:3001";
export const API_CUSTOMER = `${API_URL}/customer/api`;
export const API_SELLER = `${API_URL}/seller/api`;
export const API_COMMON = `${API_URL}/api/common`;
export const API_AUTH = `${API_URL}/api/auth`;
export const API_ADMIN = `${API_URL}/api/admin`;

export const appNavigation = {
  signin: {
    label: "Sign In",
    to: "/signin",
  },
  signup: {
    label: "Sign Up",
    to: "/signup",
  },
  admin: {
    label: "Admin",
    to: "/admin",
  },
  seller: {
    label: "Seller",
    to: "/seller",
  },
  customer: {
    label: "Customer",
    to: "/customer",
  },
};
