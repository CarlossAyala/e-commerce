import axios from "axios";

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const API_HUB_SELLER = import.meta.env.VITE_API_HUB_SELLER;
const API_HUB_CUSTOMER = import.meta.env.VITE_API_HUB_CUSTOMER;

export const SellerClient = axios.create({
  baseURL: `${API_DOMAIN}/${API_HUB_SELLER}`,
});

export const CustomerClient = axios.create({
  baseURL: `${API_DOMAIN}/${API_HUB_CUSTOMER}`,
});
