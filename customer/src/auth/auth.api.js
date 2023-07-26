import { CustomerClient, getToken } from '../api';

const ENDPOINT = 'account';

const API = {
  async getProfile() {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'GET',
      url: `/${ENDPOINT}/profile`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default API;
