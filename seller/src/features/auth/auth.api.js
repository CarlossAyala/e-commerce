import SellerClient, { getToken } from '../../api';

const ENDPOINT = 'account';

const API = {
  async getProfile() {
    const token = getToken();

    const { data } = await SellerClient.request({
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
