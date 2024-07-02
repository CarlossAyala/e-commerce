import { API_SHARED } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_SHARED}/payment-methods`;

export const findOne = (paymentMethodId, accessToken) => {
  const url = `${ENDPOINT}/${paymentMethodId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAll = (accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findSession = (sessionId, accessToken) => {
  const url = `${ENDPOINT}/session/${sessionId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const create = (values, accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};

export const remove = (paymentMethodId, accessToken) => {
  const url = `${ENDPOINT}/${paymentMethodId}`;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
