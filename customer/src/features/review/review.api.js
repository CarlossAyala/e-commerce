import { CustomerClient, getToken } from '../../api';

const REVIEW = 'reviews';

const API = {
  async getReviews(productId) {
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
  async getStats(productId) {
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
};

export default API;
