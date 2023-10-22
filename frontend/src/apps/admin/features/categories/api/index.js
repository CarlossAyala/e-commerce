import { API_ADMIN } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";
import { getToken } from "../../../../../utils";

const ENDPOINT = `${API_ADMIN}/categories`;

export const findMixed = async () => {
  const url = `${ENDPOINT}/mixed`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findOne = async (id) => {
  const url = `${ENDPOINT}/${id}`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const create = (values) => {
  const url = ENDPOINT;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const attach = (values) => {
  const url = `${ENDPOINT}/attach`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const detach = (values) => {
  const url = `${ENDPOINT}/detach`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const update = (categoryId, values) => {
  const url = `${ENDPOINT}/${categoryId}`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
};

export const remove = (categoryId) => {
  const url = `${ENDPOINT}/${categoryId}`;
  const token = getToken();

  if (!token) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
