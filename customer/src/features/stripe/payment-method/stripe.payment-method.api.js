import { StripeClient, getToken } from '../../../api';

const PAYMENT_METHOD = 'payment-methods';

const API = {
  async get(id) {
    const url = `${PAYMENT_METHOD}/${id}`;
    const token = getToken();

    const { data } = await StripeClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async getAll() {
    const url = `${PAYMENT_METHOD}`;
    const token = getToken();

    const { data } = await StripeClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default API;