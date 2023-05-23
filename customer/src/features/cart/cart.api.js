import CustomerClient, { getToken } from '../api';

const ENDPOINT = 'cart';

const API = {
  async getItemsCart() {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'GET',
      url: `/${ENDPOINT}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async addItem(id, quantity) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url: `/${ENDPOINT}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        quantity,
      },
    });

    return data;
  },
  async updateQuantity(cartItemId, quantity) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'PATCH',
      url: `/${ENDPOINT}/quantity/${cartItemId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        quantity,
      },
    });

    return data;
  },
  async updateVisibility(cartItemId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'PATCH',
      url: `/${ENDPOINT}/visibility/${cartItemId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async removeItem(cartItemId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url: `/${ENDPOINT}/${cartItemId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async clear() {
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
};

export default API;
