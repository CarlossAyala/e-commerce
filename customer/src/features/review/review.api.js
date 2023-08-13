import { CustomerClient, getToken } from '../../api';

const REVIEW = 'reviews';

const API = {
  async getReview(reviewId) {
    const url = `/${REVIEW}/${reviewId}`;
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
  async getCustomerPendingReviews() {
    const url = `/${REVIEW}/customer/pending`;
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
  async getCustomerDoneReviews() {
    const url = `/${REVIEW}/customer/done`;
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
  async getProductReviews(productId) {
    const url = `/${REVIEW}/product/${productId}`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async getProductStats(productId) {
    const url = `/${REVIEW}/product/${productId}/stats`;

    const { data } = await CustomerClient.request({
      method: 'GET',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  },
  async likeReview(reviewId) {
    const url = `/${REVIEW}/${reviewId}/like`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async dislikeReview(reviewId) {
    const url = `/${REVIEW}/${reviewId}/dislike`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async create(reviewId, values) {
    const url = `/${REVIEW}/${reviewId}`;
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
};

export default API;
