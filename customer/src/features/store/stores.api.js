import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ROOT = 'stores';

const StoresAPI = {
  async getStoreBySlug(slug) {
    const url = `${BASE_API}/${ROOT}/slug/${slug}`;
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
  async getStoreCategories(cat) {
    const url = `${BASE_API}/${ROOT}/categories/${cat}`;
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
  async getStoreProducts(cat, query) {
    let url = `${BASE_API}/${ROOT}/products/${cat}`;
    if (typeof query === 'string' && query) url += `?${query}`;

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

export default StoresAPI;
