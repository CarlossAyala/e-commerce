import { API_SELLER } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";
import { getToken } from "../../../../utils/local-storage";

const ENDPOINT = `${API_SELLER}/sales`;

export const findOne = async (orderId) => {
  const url = `${ENDPOINT}/${orderId}`;
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
