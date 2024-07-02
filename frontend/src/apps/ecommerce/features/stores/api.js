import { API_ECOMMERCE } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_ECOMMERCE}/stores`;

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
