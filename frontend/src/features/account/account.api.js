import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ROOT = 'account';

const API = {
  async getProfile(jwt) {
    const url = `${BASE_API}/${ROOT}/profile`;
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
  async changeName(jwt, values) {
    const url = `${BASE_API}/${ROOT}/change-name`;
    const method = REQUEST_METHOD.PATCH;
    const headers = setupHeaders(jwt);
    const body = JSON.stringify(values);

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
  async changePassword(jwt, values) {
    const url = `${BASE_API}/${ROOT}/change-password`;
    const method = REQUEST_METHOD.PATCH;
    const headers = setupHeaders(jwt);
    const body = JSON.stringify(values);

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
};

export default API;
