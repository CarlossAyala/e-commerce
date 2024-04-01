import { API_E_COMMERCE } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_E_COMMERCE}/reviews`;

export const findAllByProductId = (productId, query) => {
  const url = `${ENDPOINT}/product/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const stat = (productId) => {
  const url = `${ENDPOINT}/product/${productId}/stats`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAllDone = (query, accessToken) => {
  const url = `${ENDPOINT}/done?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllPending = (query, accessToken) => {
  const url = `${ENDPOINT}/pending?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const create = (orderItemId, values, accessToken) => {
  const url = `${ENDPOINT}/${orderItemId}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};
