import { API_ADMIN } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_ADMIN}/stores`;

export const findAll = (query, accessToken) => {
  const url = `${ENDPOINT}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findOne = (storeId, accessToken) => {
  const url = `${ENDPOINT}/${storeId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAllRequestsVerify = (query, accessToken) => {
  const url = `${ENDPOINT}/requests-verify?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateRequestVerify = (requestId, body, accessToken) => {
  const url = `${ENDPOINT}/requests-verify/${requestId}`;

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
};
