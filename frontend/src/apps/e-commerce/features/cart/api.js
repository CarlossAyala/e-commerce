import { API_ECOMMERCE } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_ECOMMERCE}/cart`;

export const getCart = (accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const addToCart = (productId, quantity, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(quantity),
  });
};

export const removeFromCart = (productId, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateQuantity = (productId, quantity, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ quantity }),
  });
};
