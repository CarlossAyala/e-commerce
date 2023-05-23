import CustomerClient, { getToken } from '../api';

const ENDPOINT = 'bookmarks';

const API = {
  async getBookmark(productId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'GET',
      url: `/${ENDPOINT}/${productId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async getBookmarks(queries) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'GET',
      url: queries ? `/${ENDPOINT}?${queries}` : `/${ENDPOINT}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async addBookmark(productId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url: `/${ENDPOINT}/${productId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async removeBookmark(productId) {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url: `/${ENDPOINT}/${productId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async clearBookmarks() {
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url: `/${ENDPOINT}/clear`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  // async addToCart(productId) {
  //   const token = getToken();

  //   const { data } = await CustomerClient.request({
  //     method: 'POST',
  //     url: `/cart/${productId}`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: {
  //       quantity: 1,
  //     },
  //   });

  //   return data;
  // },
};

export default API;
