import { CustomerClient } from '../../api';

const STORES = 'stores';

const API = {
  async get(slug) {
    const url = `/${STORES}/${slug}`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getAll() {
    const url = `/${STORES}`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getProducts(slug) {
    const url = `/${STORES}/${slug}/products`;

    const { data } = await CustomerClient.request({
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
