import { API_CUSTOMER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_CUSTOMER}/history`;

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

export const add = (productId, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const remove = (productId, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const clear = (accessToken) => {
  const url = `${ENDPOINT}/clear`;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
