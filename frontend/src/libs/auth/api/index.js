import { API_AUTH } from "../../../configs";
import { localStorageManager } from "../../../utils/local-storage";
import { fetcher } from "../../utils";

const ENDPOINT = API_AUTH;

export const getProfile = async (query) => {
  const url = `${ENDPOINT}/profile?${query}`;
  const token = localStorageManager.getToken();

  if (!token) return null;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const signin = async (values, query) => {
  const url = `${ENDPOINT}/signin?${query}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const signup = async (values) => {
  const url = `${ENDPOINT}/signup`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const updateFullName = (data) => {
  const url = `${ENDPOINT}/change-full-name`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const updatePassword = (data) => {
  const url = `${ENDPOINT}/change-password`;
  const token = localStorageManager.getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
