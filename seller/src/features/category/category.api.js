import { SellerClient, urlWithQuery } from '../../api';

const CATEGORIES = 'categories';

const API = {
  async search(params) {
    const url = urlWithQuery(`/${CATEGORIES}/search`, params);

    const { data } = await SellerClient.request({
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
