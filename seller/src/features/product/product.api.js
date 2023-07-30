import { SellerClient, getToken } from '../../api';

const PRODUCTS = 'products';
const PUBLISH = 'publish';
const QUESTIONS = 'questions';

const API = {
  // TODO: mover esto de aquí
  async getCategory(id) {
    const url = `/${PRODUCTS}/categories/${id}`;

    const { data } = await SellerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getProducts(query) {
    const url = `/${PRODUCTS}/search${query ? `?${query}` : ''}`;
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
  async editProduct(id, values) {
    const url = `/${PRODUCTS}/${id}`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: 'PUT',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });

    return data;
  },
  async publishProduct(values) {
    const url = `/${PRODUCTS}/${PUBLISH}`;
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
  async getProduct(id) {
    const url = `/${PRODUCTS}/${id}`;
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
  async deleteProduct(id) {
    const url = `/${PRODUCTS}/${id}`;
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
  // QUESTIONS
  async getQuestions(query) {
    const url = `/${QUESTIONS}${query ? `?${query}` : ''}`;
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
  async getQuestion(id) {
    const url = `/${QUESTIONS}/${id}/product`;
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
  async getProductQuestions(id, query) {
    const url = `/${QUESTIONS}/product/${id}${query ? `?${query}` : ''}`;
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
  async sendAnswerToQuestion(id, values) {
    const url = `/${QUESTIONS}/${id}/product`;
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
  async sendStateQuestion(id, values) {
    const url = `/${QUESTIONS}/${id}/product`;
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
};

export default API;
