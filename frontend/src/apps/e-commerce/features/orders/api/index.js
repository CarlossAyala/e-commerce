import { API_ECOMMERCE } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_ECOMMERCE}/orders`;

export const findOne = (orderId, accessToken) => {
  const url = `${ENDPOINT}/${orderId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAll = (query, accessToken) => {
  const url = `${ENDPOINT}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findItem = (itemId, accessToken) => {
  const url = `${ENDPOINT}/items/${itemId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
