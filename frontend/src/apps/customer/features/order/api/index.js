import { API_CUSTOMER } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";

const ENDPOINT = `${API_CUSTOMER}/orders`;

export const findOne = (orderId) => {
  const url = `${ENDPOINT}/${orderId}`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("No token found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAll = (query) => {
  const url = `${ENDPOINT}?${query}`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("No token found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
