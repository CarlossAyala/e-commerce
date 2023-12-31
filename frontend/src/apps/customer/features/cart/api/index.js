import { API_CUSTOMER } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";
import { localStorageManager } from "../../../../../utils";

const ENDPOINT = `${API_CUSTOMER}/cart`;

export const cart = (query) => {
  const url = `${ENDPOINT}?${query}`;
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

export const add = (productId, quantity) => {
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
    body: JSON.stringify(quantity),
  });
};

export const remove = (itemId) => {
  const url = `${ENDPOINT}/${itemId}`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const clear = () => {
  const url = `${ENDPOINT}/clear`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateQuantity = (itemId, quantity) => {
  const url = `${ENDPOINT}/${itemId}`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quantity),
  });
};

export const updateVisibility = (itemId) => {
  const url = `${ENDPOINT}/${itemId}/visibility`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
