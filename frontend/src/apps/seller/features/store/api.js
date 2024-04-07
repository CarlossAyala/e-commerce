import { API_SELLER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_SELLER}/stores`;

export const getStore = async (accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const create = async (values, accessToken) => {
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

export const update = async (values, accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};

export const remove = async (accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
