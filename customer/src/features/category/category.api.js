import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ENDPOINT = 'categories';

const CategoryAPI = {
  async getAll() {
    const url = `${BASE_API}/${ENDPOINT}`;

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
  async getCategoryBySlug(cat) {
    const url = `${BASE_API}/${ENDPOINT}/c/${cat}`;

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
  /**
   * @param {string} slug - Category slug
   */
  async getBestSubCategories(slug) {
    const url = `${BASE_API}/${ENDPOINT}/best-sub-categories/${slug}`;

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
  /**
   * @param {string} slug - Category slug
   */
  async getBestSellers(slug) {
    const url = `${BASE_API}/${ENDPOINT}/best-sellers/${slug}`;

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
  /**
   * @param {string} slug - Category slug
   */
  async getBestBrands(slug) {
    const url = `${BASE_API}/${ENDPOINT}/best-brands/${slug}`;

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
  // signup(data) {
  //   const url = `${BASE_API}/${ROOT}/signup`;
  //   const method = REQUEST_METHOD.POST;
  //   const body = JSON.stringify(data);
  //   const headers = setupHeaders();

  //   const options = {
  //     method,
  //     headers,
  //     body,
  //   };

  //   return [url, options];
  // },
  // profile(token) {
  //   const url = `${BASE_API}/${ROOT}/profile`;
  //   const method = REQUEST_METHOD.GET;
  //   const headers = setupHeaders(token);

  //   const options = {
  //     method,
  //     headers,
  //   };

  //   return [url, options];
  // },
};

export default CategoryAPI;
