import axios from 'axios';

const DOMAIN = import.meta.env.VITE_API_DOMAIN;
const GATEWAY_PUBLIC = import.meta.env.VITE_API_GATEWAY_PUBLIC;

const CustomerClient = axios.create({
  baseURL: `${DOMAIN}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = () => localStorage.getItem('jwt-ecommerce');

export default CustomerClient;
