import { API_SELLER } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";
import { getToken } from "../../../../utils/local-storage";

const ENDPOINT = `${API_SELLER}/reviews`;

export const findOne = async (reviewId) => {
  const url = `${ENDPOINT}/${reviewId}`;
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

export const overview = async (query) => {
  const url = `${ENDPOINT}/overview?${query}`;
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

export const timeline = async (query) => {
  const url = `${ENDPOINT}/timeline?${query}`;
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

export const getScore = async (productId) => {
  const url = `${ENDPOINT}/product/${productId}/score`;
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
