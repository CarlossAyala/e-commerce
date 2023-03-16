import { BASE_API, setupHeaders, RequestMethod } from '../utils/api/config.api';

const ROOT = 'cards';

const API = {
  async getAll(jwt) {
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
  async getOne(jwt, id) {
    const url = `${BASE_API}/${ROOT}/${id}`;
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
  async create(jwt, formValues) {
    const url = `${BASE_API}/${ROOT}`;

    const method = RequestMethod.post;
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

    const method = RequestMethod.put;
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
