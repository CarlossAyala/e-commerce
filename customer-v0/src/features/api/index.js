import axios from 'axios';

const DOMAIN = import.meta.env.VITE_API_DOMAIN;

const CustomerClient = axios.create({
  baseURL: `${DOMAIN}/customer/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = () => localStorage.getItem('jwt-ecommerce');

export default CustomerClient;
