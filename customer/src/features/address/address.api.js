import { CustomerClient, getToken } from '../../api';

const ADDRESSES = 'addresses';

const API = {
  async getAll() {
    const url = `/${ADDRESSES}`;
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
  async get(addressId) {
    const url = `/${ADDRESSES}/${addressId}`;
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
  async create(values) {
    const url = `/${ADDRESSES}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });

    return data;
  },
  async update(addressId, values) {
    const url = `/${ADDRESSES}/${addressId}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'PUT',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });

    return data;
  },
  async remove(addressId) {
    const url = `/${ADDRESSES}/${addressId}`;
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
