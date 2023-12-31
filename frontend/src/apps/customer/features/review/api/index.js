import { API_COMMON, API_CUSTOMER } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";
import { localStorageManager } from "../../../../../utils";

const ENDPOINT_COMMON = `${API_COMMON}/reviews`;
const ENDPOINT_CUSTOMER = `${API_CUSTOMER}/reviews`;

export const findOne = (reviewId, query) => {
  const url = `${ENDPOINT_CUSTOMER}/${reviewId}?${query}`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAll = (productId, query) => {
  const url = `${ENDPOINT_COMMON}/product/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAllByCustomer = (query) => {
  const url = `${ENDPOINT_CUSTOMER}/customer?${query}`;

  const token = localStorageManager.getToken();

  if (!token) {
    return Promise.reject("Unauthorized");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const stats = (productId) => {
  const url = `${ENDPOINT_COMMON}/product/${productId}/stats`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const like = (reviewId) => {
  const url = `${ENDPOINT_COMMON}/${reviewId}/like`;
  const token = localStorageManager.getToken();

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
  const url = `${ENDPOINT_COMMON}/${reviewId}/dislike`;
  const token = localStorageManager.getToken();

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

export const create = (reviewId, values) => {
  const url = `${ENDPOINT_CUSTOMER}/${reviewId}`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};
