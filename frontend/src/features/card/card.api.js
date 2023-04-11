import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ROOT = 'cards';

const API = {
  async getAll(jwt) {
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
  async getOne(jwt, id) {
    const url = `${BASE_API}/${ROOT}/${id}`;
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
  async create(jwt, formValues) {
    const url = `${BASE_API}/${ROOT}`;

    const method = REQUEST_METHOD.POST;
    const body = JSON.stringify(formValues);
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
  async update(jwt, id, formValues) {
    const url = `${BASE_API}/${ROOT}/${id}`;

    const method = REQUEST_METHOD.PUT;
    const body = JSON.stringify(formValues);
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
  async remove(jwt, id) {
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
};

export default API;
