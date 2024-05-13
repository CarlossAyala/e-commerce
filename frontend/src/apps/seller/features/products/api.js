import { API_SELLER } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_SELLER}/products`;

export const findOne = async (productId, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findAll = async (query, accessToken) => {
  const url = `${ENDPOINT}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const create = async (formValue, accessToken) => {
  const url = `${ENDPOINT}`;

  return fetcher(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formValue,
  });
};

export const update = async (productId, formData, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
};

export const remove = async (productId, accessToken) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCountStatus = (accessToken) => {
  const url = `${ENDPOINT}/count-status`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getCount = (accessToken) => {
  const url = `${ENDPOINT}/count`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const growthStats = (query, accessToken) => {
  const url = `${ENDPOINT}/growth-stats?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
