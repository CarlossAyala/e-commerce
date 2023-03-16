import { BASE_API, setupHeaders, RequestMethod } from '../utils/api/config.api';

const ROOT = 'businesses';

const BusinessAPI = {
  getOfficialStores() {
    const url = `${BASE_API}/${ROOT}/official-stores`;

    const method = RequestMethod.get;
    const headers = setupHeaders();

    const options = {
      method,
      headers,
    };

    return [url, options];
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

export default BusinessAPI;
