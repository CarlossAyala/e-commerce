import { SystemClient, getToken } from '../../api';

const STORES = 'stores';

const API = {
  async get(id) {
    const url = `/${STORES}/${id}`;

    const { data } = await SystemClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
};

export default API;
