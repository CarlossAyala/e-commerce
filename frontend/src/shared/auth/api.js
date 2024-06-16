import { API_AUTH } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = API_AUTH;

export const getAccessToken = (app) => {
  const url = `${ENDPOINT}/refresh-token?app=${app}`;

  return fetcher(url, {
    method: "POST",
    credentials: "include",
  });
};

export const getProfile = (accessToken) => {
  const url = `${ENDPOINT}/profile`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const signin = (app, values) => {
  const url = `${ENDPOINT}/signin?app=${app}`;

  return fetcher(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const signup = (values) => {
  const url = `${ENDPOINT}/signup`;

  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const signout = (app) => {
  const url = `${ENDPOINT}/signout?app=${app}`;

  return fetcher(url, {
    method: "POST",
    credentials: "include",
  });
};

export const updateProfile = (data, accessToken) => {
  const url = `${ENDPOINT}/profile`;

  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
};

export const updatePassword = (data, accessToken) => {
  const url = `${ENDPOINT}/password`;

  return fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
};
