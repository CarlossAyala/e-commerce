import { API_SELLER } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_SELLER}/orders`;

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

export const latestOrders = (accessToken) => {
  const url = `${ENDPOINT}/latest`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
