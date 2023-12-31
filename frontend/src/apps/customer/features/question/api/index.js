import { API_CUSTOMER } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";
import { localStorageManager } from "../../../../../utils";

const ENDPOINT = `${API_CUSTOMER}/questions`;

export const findAllProduct = (productId, query) => {
  const url = `${ENDPOINT}/product/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAllProductCustomer = (productId, query) => {
  const url = `${ENDPOINT}/product/${productId}/customer?${query}`;
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

export const findAllCustomer = (query) => {
  const url = `${ENDPOINT}/customer?${query}`;
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

export const create = (productId, data) => {
  const url = `${ENDPOINT}/${productId}`;
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
    body: JSON.stringify(data),
  });
};
