import { API_SELLER } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_SELLER}/reviews`;

export const findAll = async (query, accessToken) => {
  const url = `${ENDPOINT}/?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllByProductId = async (productId, query, accessToken) => {
  const url = `${ENDPOINT}/products/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getProductAvgRating = async (productId, accessToken) => {
  const url = `${ENDPOINT}/products/${productId}/avg-rating`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
