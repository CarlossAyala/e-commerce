import { API_ADMIN } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_ADMIN}/products`;

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
