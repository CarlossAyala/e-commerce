import { API_SHARED } from "@/configs";
import { fetcher } from "@/libs";

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

export const getAll = async () => {
  const url = ENDPOINT;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
