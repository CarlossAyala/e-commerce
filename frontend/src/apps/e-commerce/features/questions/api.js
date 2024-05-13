import { API_ECOMMERCE, API_SHARED } from "@/configs";
import { fetcher } from "@/libs";

const CUSTOMER_QA = `${API_ECOMMERCE}/qa`;
const SHARED_QA = `${API_SHARED}/qa`;

export const findAllProduct = (productId, query) => {
  const url = `${SHARED_QA}/product/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAllProductCustomer = (productId, query, accessToken) => {
  const url = `${CUSTOMER_QA}/product/${productId}/customer?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllCustomer = (query, accessToken) => {
  const url = `${CUSTOMER_QA}/customer?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const create = (productId, values, accessToken) => {
  const url = `${CUSTOMER_QA}/${productId}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};
