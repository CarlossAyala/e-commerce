import { API_CUSTOMER } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";
import { getToken } from "../../../../../utils/local-storage";

const ENDPOINT = `${API_CUSTOMER}/history`;

export const findAll = (query) => {
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

export const create = (productId) => {
  const url = `${ENDPOINT}/${productId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const remove = (productId) => {
  const url = `${ENDPOINT}/${productId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const clear = () => {
  const url = `${ENDPOINT}/clear`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
