import { CustomerClient, getToken } from '../../api';

const BOOKMARKS = 'bookmarks';

const API = {
  async getBookmarks() {
    const url = `/${BOOKMARKS}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async addBookmark(productId) {
    const url = `/${BOOKMARKS}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        productId,
      },
    });

    return data;
  },
  async removeBookmark(productId) {
    const url = `/${BOOKMARKS}/${productId}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async clearBookmark() {
    const url = `/${BOOKMARKS}/clear`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'DELETE',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default API;
