import { API_SELLER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_SELLER}/qa`;

export const findOne = async (questionId, accessToken) => {
  const url = `${ENDPOINT}/${questionId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAll = async (query, accessToken) => {
  const url = `${ENDPOINT}?${query}`;

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

export const reply = async (questionId, reply, accessToken) => {
  const url = `${ENDPOINT}/${questionId}`;

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(reply),
  });
};

export const reject = async (questionId, accessToken) => {
  const url = `${ENDPOINT}/${questionId}`;

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
