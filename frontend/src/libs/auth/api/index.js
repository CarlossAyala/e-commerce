import { API_CUSTOMER } from "../../../configs";
import { getToken } from "../../../utils/local-storage";
import { fetcher } from "../../utils";

const ENDPOINT = `${API_CUSTOMER}/account`;

export const getProfile = async () => {
  const url = `${ENDPOINT}/profile`;
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

export const signin = async (values) => {
  const url = `${ENDPOINT}/signin`;

  return fetcher(url, {
    method: "POST",
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
