import { API_COMMON } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";
import { getToken } from "../../../../utils/local-storage";

const ENDPOINT = `${API_COMMON}/payment-methods`;

export const findOne = (paymentMethodId) => {
  const url = `${ENDPOINT}/${paymentMethodId}`;
  const token = getToken();

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

export const findAll = () => {
  const url = ENDPOINT;
  const token = getToken();

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

export const findSession = (sessionId) => {
  const url = `${ENDPOINT}/session/${sessionId}`;
  const token = getToken();

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

export const create = (data) => {
  const url = ENDPOINT;
  const token = getToken();

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

export const remove = (paymentMethodId) => {
  const url = `${ENDPOINT}/${paymentMethodId}`;
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
