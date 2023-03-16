import { BASE_API, setupHeaders, RequestMethod } from '../utils/api/config.api';

const ENDPOINT = 'categories';

const CategoriesAPI = {
  async getInfoParentCatBySlug(cat) {
    const url = `${BASE_API}/${ENDPOINT}/info/${cat}`;

    const method = RequestMethod.get;
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
  async getInfoChildrenCatBySlug(cat, subCat) {
    const url = `${BASE_API}/${ENDPOINT}/info/${cat}/${subCat}`;

    const method = RequestMethod.get;
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
  async getAll() {
    const url = `${BASE_API}/${ENDPOINT}`;

    const method = RequestMethod.get;
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
    const url = `${BASE_API}/${ENDPOINT}/${slug}/best-sub-categories`;

    const method = RequestMethod.get;
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
    const url = `${BASE_API}/${ENDPOINT}/${slug}/best-sellers`;

    const method = RequestMethod.get;
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
    const url = `${BASE_API}/${ENDPOINT}/${slug}/best-brands`;

    const method = RequestMethod.get;
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
  //   const method = RequestMethod.post;
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
  //   const method = RequestMethod.get;
  //   const headers = setupHeaders(token);

  //   const options = {
  //     method,
  //     headers,
  //   };

  //   return [url, options];
  // },
};

export default CategoriesAPI;
