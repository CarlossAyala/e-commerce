import { API_AUTH } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = API_AUTH;

export const getAccessToken = async () => {
  const url = `${ENDPOINT}/refresh-token`;

  return fetcher(url, {
    method: "POST",
    credentials: "include",
  });
};

export const getProfile = async (accessToken) => {
  const url = `${ENDPOINT}/profile`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const signin = async (values) => {
  const url = `${ENDPOINT}/signin`;

  return fetcher(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const signup = async (values) => {
  const url = `${ENDPOINT}/signup`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const signout = async () => {
  const url = `${ENDPOINT}/signout`;

  return fetcher(url, {
    method: "POST",
    credentials: "include",
  });
};

export const updateFullName = (data, accessToken) => {
  const url = `${ENDPOINT}/change-full-name`;

  if (!accessToken) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
};

export const updatePassword = (data, accessToken) => {
  const url = `${ENDPOINT}/change-password`;

  if (!accessToken) {
    throw new Error("Token not found");
  }

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
};
