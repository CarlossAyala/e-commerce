import axios from 'axios';

const DOMAIN = import.meta.env.VITE_API_DOMAIN;
const API_HUB_CUSTOMER = import.meta.env.VITE_API_HUB_CUSTOMER;
const API_HUB_SYSTEM = import.meta.env.VITE_API_HUB_SYSTEM;
const API_HUB_STRAPI = import.meta.env.VITE_API_HUB_STRAPI;

const TOKEN_LS = import.meta.env.VITE_TOKEN_LS;

export const CustomerClient = axios.create({
  baseURL: `${DOMAIN}/${API_HUB_CUSTOMER}`,
});

export const SystemClient = axios.create({
  baseURL: `${DOMAIN}/${API_HUB_SYSTEM}`,
});

export const StrapiClient = axios.create({
  baseURL: `${DOMAIN}/${API_HUB_STRAPI}`,
});

export const getToken = () => localStorage.getItem(TOKEN_LS);
export const setToken = (token) => localStorage.setItem(TOKEN_LS, token);
export const removeToken = () => localStorage.removeItem(TOKEN_LS);
