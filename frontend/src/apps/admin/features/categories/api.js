import { API_ADMIN } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_ADMIN}/categories`;

export const getAll = (accessToken) => {
  const url = `${ENDPOINT}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findOne = (categoryId, accessToken) => {
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
      Authorization: `Bearer ${accessToken}`,
    },
    body: values,
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

export const update = (categoryId, formData, accessToken) => {
  const url = `${ENDPOINT}/${categoryId}`;

  return fetcher(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
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

export const count = (accessToken) => {
  const url = `${ENDPOINT}/count`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
