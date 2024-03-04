import { API_CUSTOMER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT_CUSTOMER = `${API_CUSTOMER}/reviews`;

export const findAllDone = (query, accessToken) => {
  const url = `${ENDPOINT_CUSTOMER}/done?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllPending = (query, accessToken) => {
  const url = `${ENDPOINT_CUSTOMER}/pending?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const create = (orderItemId, values, accessToken) => {
  const url = `${ENDPOINT_CUSTOMER}/${orderItemId}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};
