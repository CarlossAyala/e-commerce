import { StripeClient, getToken } from '../../../api';

const CHECKOUT_SESSIONS = 'checkout-sessions';

const API = {
  async get(id) {
    const url = `${CHECKOUT_SESSIONS}/${id}`;
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
  async create(query) {
    const url = `${CHECKOUT_SESSIONS}${query ? `?${query}` : ''}`;
    const token = getToken();

    const { data } = await StripeClient.request({
      method: 'POST',
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
