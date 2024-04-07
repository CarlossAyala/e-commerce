import { API_E_COMMERCE } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_E_COMMERCE}/addresses`;

export const findOne = (addressId, accessToken) => {
  const url = `${ENDPOINT}/${addressId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAll = (accessToken) => {
  const url = `${ENDPOINT}`;

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

export const update = (addressId, values, accessToken) => {
  const url = `${ENDPOINT}/${addressId}`;

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};

export const remove = (addressId, accessToken) => {
  const url = `${ENDPOINT}/${addressId}`;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
