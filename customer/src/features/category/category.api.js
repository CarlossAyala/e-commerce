import { SystemClient, urlWithParams } from '../../api';

const CATEGORIES = 'categories';

const API = {
  async getMains() {
    const url = `/${CATEGORIES}/main`;

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
