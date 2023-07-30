import { StripeClient, getToken } from '../../../api';

const SETUP_INTENTS = 'setup-intents';

const API = {
  async get(id) {
    const url = `${SETUP_INTENTS}/${id}`;
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
