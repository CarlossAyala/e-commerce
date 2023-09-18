import { API_SELLER } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";
import { getToken } from "../../../../utils/local-storage";

const ENDPOINT = `${API_SELLER}/products`;

export const findOne = async (productId) => {
  const url = `${ENDPOINT}/${productId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAll = async (query) => {
  const url = `${ENDPOINT}?${query}`;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyYjVlMjg0LTBiZDktNGY4Ni04N2E1LTQwOWYzM2Y4OGZlZCIsImlhdCI6MTY5NDgwMzM4MX0.Eu2hm_8T2by75Xw_xzx9ZrW0S15AeN_xAsz-oVf2J3U";

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findAllLowStock = async (query) => {
  const url = `${ENDPOINT}/low-stock?${query}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const create = async (values) => {
  const url = `${ENDPOINT}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const update = async (productId, values) => {
  const url = `${ENDPOINT}/${productId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const remove = async (productId) => {
  const url = `${ENDPOINT}/${productId}`;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
