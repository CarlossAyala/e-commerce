import { CustomerClient, SystemClient, urlWithParams } from '../../api';

const CATEGORIES = 'categories';

const API = {
  async getMains() {
    const url = `/${CATEGORIES}/main`;

    const { data } = await SystemClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getCategoriesFullList() {
    const url = `/${CATEGORIES}/full-list`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getCategory(slug) {
    const url = `/${CATEGORIES}/${slug}`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getBySlugList(slug) {
    const url = `/${CATEGORIES}/${slug}/list`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getBestSellers(slug) {
    const url = `/${CATEGORIES}/${slug}/best-sellers`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getTopRated(slug) {
    const url = `/${CATEGORIES}/${slug}/top-rated`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getRandom(slug) {
    const url = `/${CATEGORIES}/${slug}/random`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getStores(slug) {
    const url = `/${CATEGORIES}/${slug}/stores`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
};

export default API;
