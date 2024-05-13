import { API_ADMIN } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_ADMIN}/users`;

export const count = (accessToken) => {
  const url = `${ENDPOINT}/count`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const growthStats = (query, accessToken) => {
  const url = `${ENDPOINT}/growth-stats?${query}`;

  return fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
