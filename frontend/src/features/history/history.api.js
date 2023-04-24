import CustomerClient, { getToken } from '../api';

const ENDPOINT = 'history';

const API = {
  async getHistoryProducts(queries) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'GET',
      url: queries ? `/${ENDPOINT}?${queries}` : `/${ENDPOINT}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async addToHistory(productId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url: `/${ENDPOINT}/${productId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async removeFromHistory(productId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url: `/${ENDPOINT}/${productId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async clearHistory() {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url: `/${ENDPOINT}/clear`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async addToCart(productId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url: `/cart/${productId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        quantity: 1,
      },
    });

    return data;
  },
};

export default API;
