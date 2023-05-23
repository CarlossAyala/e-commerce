import axios from 'axios';

const DOMAIN = import.meta.env.VITE_API_DOMAIN;
const GATEWAY_PUBLIC = import.meta.env.VITE_API_GATEWAY_PUBLIC;

const TOKEN_LS = import.meta.env.VITE_TOKEN_LS;

const SellerClient = axios.create({
  baseURL: `${DOMAIN}/api/v1`,
});

export const getToken = () => localStorage.getItem(TOKEN_LS);
export const setToken = (token) => localStorage.setItem(TOKEN_LS, token);
export const removeToken = () => localStorage.removeItem(TOKEN_LS);

export default SellerClient;
