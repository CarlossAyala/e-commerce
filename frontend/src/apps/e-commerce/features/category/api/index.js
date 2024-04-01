import { API_E_COMMERCE } from "@/configs";
import { fetcher } from "@/libs";

const ENDPOINT = `${API_E_COMMERCE}/categories`;

export const findMain = () => {
  const url = `${ENDPOINT}/main`;

  return fetcher(url, {
    method: "GET",
  });
};

export const findFull = () => {
  const url = `${ENDPOINT}/full`;

  return fetcher(url, {
    method: "GET",
  });
};

export const findOne = (slug) => {
  const url = `${ENDPOINT}/${slug}`;

  return fetcher(url, {
    method: "GET",
  });
};

export const findList = (slug) => {
  const url = `${ENDPOINT}/${slug}/list`;

  return fetcher(url, {
    method: "GET",
  });
};

export const getProductsBestSeller = (slug) => {
  const url = `${ENDPOINT}/${slug}/products/best-seller`;

  return fetcher(url, {
    method: "GET",
  });
};

export const getProductsRandom = (slug) => {
  const url = `${ENDPOINT}/${slug}/products/random`;

  return fetcher(url, {
    method: "GET",
  });
};

export const getStores = (slug) => {
  const url = `${ENDPOINT}/${slug}/stores`;

  return fetcher(url, {
    method: "GET",
  });
};
