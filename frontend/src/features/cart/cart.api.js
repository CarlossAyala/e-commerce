import { BASE_API, setupHeaders, RequestMethod } from '../utils/api/config.api';

const ROOT = 'cart';

const API = {
  async getItemsCart(jwt) {
    const url = `${BASE_API}/${ROOT}`;
    const method = RequestMethod.get;
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
    const method = RequestMethod.post;
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
    const method = RequestMethod.patch;
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
    const method = RequestMethod.patch;
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
    const method = RequestMethod.remove;
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
    const method = RequestMethod.remove;
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
