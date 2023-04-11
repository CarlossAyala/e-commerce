import {
  BASE_API,
  setupHeaders,
  REQUEST_METHOD,
} from '../utils/api/config.api';

const ROOT = 'best-sellers';

const BestSellerAPI = {
  getBestSellers() {
    const url = `${BASE_API}/${ROOT}`;

    const method = REQUEST_METHOD.GET;
    const headers = setupHeaders();

    const options = {
      method,
      headers,
    };

    return [url, options];
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

export default BestSellerAPI;
