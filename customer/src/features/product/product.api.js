import { SystemClient, getToken } from '../../api';

const PRODUCTS = 'products';
const PUBLISH = 'publish';
const QUESTIONS = 'questions';

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
  async getQAProduct(id) {
    const url = `/${PRODUCTS}/${id}/QA`;

    const { data } = await SystemClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getCustomerQAProduct(id) {
    const url = `/${PRODUCTS}/${id}/customerQA`;
    const token = getToken();

    const { data } = await SystemClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async sendQuestion(id, values) {
    const url = `/${PRODUCTS}/${id}/${QUESTIONS}`;
    const token = getToken();

    const { data } = await SystemClient.request({
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
};

export default API;
