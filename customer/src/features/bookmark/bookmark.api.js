import { CustomerClient, getToken } from '../../api';

const BOOKMARKS = 'bookmarks';

const API = {
  async getAll() {
    const url = `/${BOOKMARKS}`;
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
  async get(productId) {
    const url = `/${BOOKMARKS}/${productId}`;
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
  async add(productId) {
    const url = `/${BOOKMARKS}/${productId}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async remove(productId) {
    const url = `/${BOOKMARKS}/${productId}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async clear() {
    const url = `/${BOOKMARKS}/clear`;
    const token = getToken();

    const { data } = await CustomerClient.request({
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
