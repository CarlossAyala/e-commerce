import { API_SHARED } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";

const ENDPOINT = `${API_SHARED}/categories`;

export const findOne = async (id) => {
  const url = `${ENDPOINT}/${id}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAll = async (query) => {
  const url = `${ENDPOINT}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
