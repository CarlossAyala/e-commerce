import { BASE_API, setupHeaders, RequestMethod } from '../utils/api/config.api';

const ROOT = 'account';

const AccountAPI = {
  async signin(formValues) {
    const url = `${BASE_API}/${ROOT}/signin`;

    const method = RequestMethod.post;
    const body = JSON.stringify(formValues);
    const headers = setupHeaders();

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
  async profile(token) {
    const url = `${BASE_API}/${ROOT}/profile`;
    const method = RequestMethod.get;
    const headers = setupHeaders(token);

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

export default AccountAPI;
