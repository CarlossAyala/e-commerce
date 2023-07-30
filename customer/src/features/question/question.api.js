import { CustomerClient, getToken } from '../../api';

const QUESTIONS = 'questions';

const API = {
  async fromCustomer(productId) {
    const url = `/${QUESTIONS}/product/${productId}/customer`;
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
  async fromProduct(productId) {
    const url = `/${QUESTIONS}/product/${productId}`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async createQuestion(productId, question) {
    const url = `/${QUESTIONS}/${productId}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: question,
    });

    return data;
  },
};

export default API;
