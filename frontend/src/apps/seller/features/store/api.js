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

export const update = async (formData, accessToken) => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
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

export const earnings = (accessToken) => {
  const url = `${ENDPOINT}/earnings`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
