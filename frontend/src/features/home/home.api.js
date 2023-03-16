import { BASE_API, setupHeaders, RequestMethod } from '../utils/api/config.api';

const HomeAPI = {
  async getBestStores() {
    const url = `${BASE_API}/businesses/best-brands`;

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
  async getBestCategories() {
    const url = `${BASE_API}/categories/best-categories`;

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

export default HomeAPI;
