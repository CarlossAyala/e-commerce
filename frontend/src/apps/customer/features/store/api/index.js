import { API_CUSTOMER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_CUSTOMER}/stores`;

export const findByName = (name) => {
  const url = `${ENDPOINT}/${name}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findByProductId = (productId) => {
  const url = `${ENDPOINT}/${productId}/by-product-id`;

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

export const products = (name, query) => {
  const url = `${ENDPOINT}/${name}/products?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
