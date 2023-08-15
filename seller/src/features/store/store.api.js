import { SellerClient, getToken } from '../../api';

const STORE = 'stores';

const API = {
  async getStore() {
    const url = `/${STORE}`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async createStore(values) {
    const url = `/${STORE}`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });

    return data;
  },
  async changeName(values) {
    const url = `/${STORE}/change-name`;
    const token = getToken();

    const { data } = await SellerClient.request({
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
  async changeDescription(values) {
    const url = `/${STORE}/change-description`;
    const token = getToken();

    const { data } = await SellerClient.request({
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
  async deleteStore() {
    const url = `/${STORE}`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: 'DELETE',
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
