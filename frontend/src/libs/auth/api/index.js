import { API_CUSTOMER } from "../../../configs";
import { getToken } from "../../../utils/local-storage";
import { fetcher } from "../../utils";

const ENDPOINT = `${API_CUSTOMER}/account`;

export const getProfile = async () => {
  const url = ENDPOINT;
  const token = getToken();

  if (!token) throw new Error("Token not found");

  const response = await fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const signin = async (values) => {
  const url = `${ENDPOINT}/signin`;

  const response = await fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response;
};

export const signup = async (values) => {
  const url = `${ENDPOINT}/signup`;

  const response = await fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response;
};
