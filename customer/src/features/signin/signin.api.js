import { CustomerClient } from '../../api';

const ENDPOINT = 'account';

const API = {
  async signin(values) {
    const { data } = await CustomerClient.request({
      method: 'POST',
      url: `/${ENDPOINT}/signin`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    });

    return data;
  },
};

export default API;
