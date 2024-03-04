import { API_CUSTOMER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_CUSTOMER}/checkout`;

export const findOne = (paymentIntentId, accessToken) => {
  const url = `${ENDPOINT}/${paymentIntentId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const create = (accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const confirm = (paymentIntentId, values, accessToken) => {
  const url = `${ENDPOINT}/${paymentIntentId}/confirm`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};
