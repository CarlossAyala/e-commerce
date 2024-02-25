import { API_CUSTOMER } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";

const ENDPOINT = `${API_CUSTOMER}/checkouts`;

export const findOne = (paymentIntentId) => {
  const url = `${ENDPOINT}/${paymentIntentId}`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("No token found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const create = () => {
  const url = ENDPOINT;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const confirm = (paymentIntentId, data) => {
  const url = `${ENDPOINT}/${paymentIntentId}/confirm`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("No token found");
  }

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
