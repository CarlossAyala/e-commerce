import { CustomerClient, getToken } from '../api';

const ENDPOINT = 'account';

const API = {
  async getProfile() {
    const url = `/${ENDPOINT}/profile`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async signin(values) {
    const url = `/${ENDPOINT}/signin`;

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    });

    return data;
  },

  async signup(values) {
    const url = `/${ENDPOINT}/signup`;

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    });

    return data;
  },
  async changeName(values) {
    const url = `/${ENDPOINT}/change-name`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'PATCH',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });

    return data;
  },
  async changePassword(values) {
    const url = `/${ENDPOINT}/change-password`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'PATCH',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });

    return data;
  },
};

export default API;
