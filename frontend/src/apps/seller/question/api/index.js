import { API_SELLER } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";
import { getToken } from "../../../../utils/local-storage";

const ENDPOINT = `${API_SELLER}/qa`;

export const findOne = async (questionId) => {
  const url = `${ENDPOINT}/${questionId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAll = async (query) => {
  const url = `${ENDPOINT}?${query}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAllByProductId = async (productId, query) => {
  const url = `${ENDPOINT}/product/${productId}?${query}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const reply = async (questionId, reply) => {
  const url = `${ENDPOINT}/${questionId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reply),
  });
};

export const reject = async (questionId) => {
  const url = `${ENDPOINT}/${questionId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
