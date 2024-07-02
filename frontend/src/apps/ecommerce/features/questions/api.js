import { API_ECOMMERCE, API_SHARED } from "@/configs";
import { fetcher } from "@/shared/utils";

const CUSTOMER_QUESTIONS = `${API_ECOMMERCE}/questions`;
const SHARED_QUESTIONS = `${API_SHARED}/questions`;

export const findAllProduct = (productId, query) => {
  const url = `${SHARED_QUESTIONS}/product/${productId}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAllCustomer = (query, accessToken) => {
  const url = `${CUSTOMER_QUESTIONS}/customer?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const create = (productId, values, accessToken) => {
  const url = `${CUSTOMER_QUESTIONS}/${productId}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};
