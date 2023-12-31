import { API_SELLER } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";
import { localStorageManager } from "../../../../utils/local-storage";

const ENDPOINT = `${API_SELLER}/stores`;

export const findOne = async () => {
  const url = ENDPOINT;
  const token = localStorageManager.getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStats = async () => {
  const url = `${ENDPOINT}/stats`;
  const token = localStorageManager.getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const create = async (values) => {
  const url = ENDPOINT;
  const token = localStorageManager.getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const update = async (values) => {
  const url = ENDPOINT;
  const token = localStorageManager.getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const remove = async () => {
  const url = ENDPOINT;
  const token = localStorageManager.getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
