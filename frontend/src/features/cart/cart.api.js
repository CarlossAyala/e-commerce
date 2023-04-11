import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ROOT = 'cart';

const API = {
  async getItemsCart(jwt) {
    const url = `${BASE_API}/${ROOT}`;
    const method = REQUEST_METHOD.GET;
    const headers = setupHeaders(jwt);

    const options = {
      method,
      headers,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
  /**
   * @param {string} jwt Customer
   * @param {string} id Product
   * @param {object} quantity { quantity : number }
   */
  async addItem(jwt, id, quantity) {
    const url = `${BASE_API}/${ROOT}/${id}`;
    const method = REQUEST_METHOD.POST;
    const body = JSON.stringify(quantity);
    const headers = setupHeaders(jwt);

    const options = {
      method,
      headers,
      body,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
  /**
   * @param {string} jwt Customer
   * @param {string} id Item Cart
   * @param {object} quantity { quantity : number }
   */
  async updateQuantity(jwt, id, quantity) {
    const url = `${BASE_API}/${ROOT}/quantity/${id}`;
    const method = REQUEST_METHOD.PATCH;
    const body = JSON.stringify(quantity);
    const headers = setupHeaders(jwt);

    const options = {
      method,
      headers,
      body,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
  /**
   * @param {string} jwt Customer
   * @param {string} id Item Cart
   */
  async updateVisibility(jwt, id) {
    const url = `${BASE_API}/${ROOT}/visible/${id}`;
    const method = REQUEST_METHOD.PATCH;
    const headers = setupHeaders(jwt);

    const options = {
      method,
      headers,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
  /**
   * @param {string} jwt Customer
   * @param {string} id Item Cart
   */
  async removeItem(jwt, id) {
    const url = `${BASE_API}/${ROOT}/${id}`;
    const method = REQUEST_METHOD.REMOVE;
    const headers = setupHeaders(jwt);

    const options = {
      method,
      headers,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
  /**
   * @param {string} jwt Customer
   */
  async clear(jwt) {
    const url = `${BASE_API}/${ROOT}/clear`;
    const method = REQUEST_METHOD.REMOVE;
    const headers = setupHeaders(jwt);

    const options = {
      method,
      headers,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
};

export default API;
