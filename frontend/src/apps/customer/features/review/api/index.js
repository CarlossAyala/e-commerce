import { API_COMMON } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";
import { getToken } from "../../../../../utils/local-storage";

const ENDPOINT = `${API_COMMON}/reviews`;

export const findOne = (reviewId) => {
  const url = `${ENDPOINT}/${reviewId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAll = (productId, query) => {
  const url = `${ENDPOINT}/product/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const stats = (productId) => {
  const url = `${ENDPOINT}/product/${productId}/stats`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const like = (reviewId) => {
  const url = `${ENDPOINT}/${reviewId}/like`;
  const token = getToken();

  if (!token) {
    return Promise.reject("Unauthorized");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const dislike = (reviewId) => {
  const url = `${ENDPOINT}/${reviewId}/dislike`;
  const token = getToken();

  if (!token) {
    return Promise.reject("Unauthorized");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
