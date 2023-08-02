import { SystemClient } from '../../api';

const PRODUCTS = 'products';

const API = {
  async getProduct(id) {
    const url = `/${PRODUCTS}/${id}`;

    const { data } = await SystemClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async searchProducts(query) {
    const url = `/${PRODUCTS}/search${query ? `?${query}` : ''}`;

    const { data } = await SystemClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getRelatedProducts(id) {
    const url = `/${PRODUCTS}/${id}/related`;

    const { data } = await SystemClient.request({
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
