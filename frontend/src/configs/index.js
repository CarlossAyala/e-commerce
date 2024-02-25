// Config Backend API
export const API_URL = "http://localhost:3001";
export const API_CUSTOMER = `${API_URL}/api/customer`;
export const API_SELLER = `${API_URL}/api/seller`;
export const API_SHARED = `${API_URL}/api/shared`;
export const API_AUTH = `${API_URL}/api/auth`;
export const API_ADMIN = `${API_URL}/api/admin`;
export const APP_NAME = "Fake-Commerce";

export const APP_NAVIGATION = {
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
