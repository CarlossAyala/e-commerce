import { API_E_COMMERCE } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_E_COMMERCE}/stores`;

export const findOne = (storeId) => {
  const url = `${ENDPOINT}/${storeId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findByProductId = (productId) => {
  const url = `${ENDPOINT}/find-by-product-id/${productId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAll = (query) => {
  const url = `${ENDPOINT}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const products = (storeId, query) => {
  const url = `${ENDPOINT}/${storeId}/products?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
