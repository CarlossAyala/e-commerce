import CustomerClient from '../api';

const ENDPOINT = 'stores';

const API = {
  async getStores(queries) {
    const { data } = await CustomerClient.request({
      method: 'GET',
      url: queries ? `/${ENDPOINT}?${queries}` : `/${ENDPOINT}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
};

export default API;
