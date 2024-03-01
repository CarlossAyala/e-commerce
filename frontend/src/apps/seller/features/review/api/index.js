import { API_SELLER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_SELLER}/reviews`;

export const findOne = async (reviewId, accessToken) => {
  const url = `${ENDPOINT}/${reviewId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const overview = async (query, accessToken) => {
  const url = `${ENDPOINT}/overview?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const timeline = async (query, accessToken) => {
  const url = `${ENDPOINT}/timeline?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllByProductId = async (productId, query, accessToken) => {
  const url = `${ENDPOINT}/product/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getScore = async (productId, accessToken) => {
  const url = `${ENDPOINT}/product/${productId}/score`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
