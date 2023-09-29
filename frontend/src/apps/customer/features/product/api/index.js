import { API_COMMON } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";

const ENDPOINT = `${API_COMMON}/products`;

export const findOne = (productId) => {
  const url = `${ENDPOINT}/${productId}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const findAll = (query) => {
  const url = `${ENDPOINT}?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const related = (productId) => {
  const url = `${ENDPOINT}/${productId}/related`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
