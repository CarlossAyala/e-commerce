import { API_ECOMMERCE } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_ECOMMERCE}/bookmarks`;

export const findOne = (productId, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

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

export const create = (productId, accessToken) => {
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
