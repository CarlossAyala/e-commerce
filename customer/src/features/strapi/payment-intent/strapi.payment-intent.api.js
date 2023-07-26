import { StrapiClient, getToken } from '../../../api';

const PAYMENT_INTENTS = 'payment-intents';

const API = {
  async create() {
    const url = `${PAYMENT_INTENTS}`;
    const token = getToken();

    const { data } = await StrapiClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async confirm(data) {
    const url = `${PAYMENT_INTENTS}/confirm`;
    const token = getToken();

    const { data: response } = await StrapiClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data,
    });

    return response;
  },
};

export default API;
