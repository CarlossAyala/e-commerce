import { API_ADMIN } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";
import { getToken } from "../../../../../utils";

const ENDPOINT = `${API_ADMIN}/stats`;

export const customersStores = () => {
  const url = `${ENDPOINT}/customers-stores`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const customers = () => {
  const url = `${ENDPOINT}/customers`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const stores = () => {
  const url = `${ENDPOINT}/stores`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const orders = () => {
  const url = `${ENDPOINT}/orders`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const revenues = () => {
  const url = `${ENDPOINT}/revenues`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
