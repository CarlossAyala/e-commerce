import axios from 'axios';

const DOMAIN = import.meta.env.VITE_API_DOMAIN;
const API_HUB_SELLER = import.meta.env.VITE_API_HUB_SELLER;
const API_HUB_CUSTOMER = import.meta.env.VITE_API_HUB_CUSTOMER;

const TOKEN_LS = import.meta.env.VITE_TOKEN_LS;

export const SellerClient = axios.create({
  baseURL: `${DOMAIN}/${API_HUB_SELLER}`,
});

export const CustomerClient = axios.create({
  baseURL: `${DOMAIN}/${API_HUB_CUSTOMER}`,
});

export const getToken = () => localStorage.getItem(TOKEN_LS);
export const setToken = (token) => localStorage.setItem(TOKEN_LS, token);
export const removeToken = () => localStorage.removeItem(TOKEN_LS);
export const urlWithParams = (url, params) => {
  return `${url}${params ? `?${params}` : ''}`;
};
