import { API_ADMIN } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_ADMIN}/categories`;

export const findAll = async (accessToken) => {
  const url = `${ENDPOINT}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findOne = async (categoryId, accessToken) => {
  const url = `${ENDPOINT}/${categoryId}`;

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

export const attach = (categoryId, values, accessToken) => {
  const url = `${ENDPOINT}/${categoryId}/attach`;

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};

export const detach = (categoryId, values, accessToken) => {
  const url = `${ENDPOINT}/${categoryId}/detach`;

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};

export const update = (categoryId, values, accessToken) => {
  const url = `${ENDPOINT}/${categoryId}`;

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });
};

export const remove = (categoryId, accessToken) => {
  const url = `${ENDPOINT}/${categoryId}`;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
