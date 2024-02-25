import { API_SELLER } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";

const ENDPOINT = `${API_SELLER}/sales`;

export const findOne = async (orderId) => {
  const url = `${ENDPOINT}/${orderId}`;
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

export const findAll = async (query) => {
  const url = `${ENDPOINT}?${query}`;
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
