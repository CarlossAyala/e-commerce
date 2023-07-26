import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ROOT = 'categories';

const CategoryProductAPI = {
  async getCategoryStores(cat) {
    const url = `${BASE_API}/${ROOT}/stores/${cat}`;
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
  async getCategoryProducts(cat, query) {
    let url = `${BASE_API}/${ROOT}/products/${cat}`;
    if (query) url += `?${query}`;

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

export default CategoryProductAPI;
