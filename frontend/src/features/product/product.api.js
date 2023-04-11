import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ENDPOINT = 'products';

const ProductsAPI = {
  async getOne(id) {
    const url = `${BASE_API}/${ENDPOINT}/${id}`;

    const method = REQUEST_METHOD.GET;
    const headers = setupHeaders();

    const options = {
      method,
      headers,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
  async getInfoStore(id) {
    const url = `${BASE_API}/businesses/id/${id}`;

    const method = REQUEST_METHOD.GET;
    const headers = setupHeaders();

    const options = {
      method,
      headers,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || response.statusText);

    return data;
  },
  async getQAs(id) {
    const url = `${BASE_API}/questions/product/${id}`;

    const method = REQUEST_METHOD.GET;
    const headers = setupHeaders();

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

export default ProductsAPI;
