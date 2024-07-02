import { API_ECOMMERCE } from "@/configs";
import { fetcher } from "@/shared/utils";

const ENDPOINT = `${API_ECOMMERCE}/categories`;

export const randoms = (categoryId) => {
  const url = `${ENDPOINT}/${categoryId}/products/randoms`;

  return fetcher(url, {
    method: "GET",
  });
};
