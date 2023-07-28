import { CustomerClient, getToken, urlWithParams } from '../../api';

const HISTORY = 'history';

const API = {
  async getHistory(params) {
    const url = urlWithParams(`/${HISTORY}`, params);
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
  async addToHistory(id) {
    const url = `/${HISTORY}/${id}`;
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
  async removeFromHistory(id) {
    const url = `/${HISTORY}/${id}`;
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
  async clearHistory() {
    const url = `/${HISTORY}/clear`;
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
