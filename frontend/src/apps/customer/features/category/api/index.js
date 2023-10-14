import { API_CUSTOMER } from "../../../../../configs";
import { fetcher } from "../../../../../libs/utils";

const ENDPOINT = `${API_CUSTOMER}/categories`;

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

export const findProductsBestSellers = (slug) => {
  const url = `${ENDPOINT}/${slug}/products/best-sellers`;

  return fetcher(url, {
    method: "GET",
  });
};

export const findProductsTopRated = (slug) => {
  const url = `${ENDPOINT}/${slug}/products/top-rated`;

  return fetcher(url, {
    method: "GET",
  });
};

export const findProductsRandoms = (slug) => {
  const url = `${ENDPOINT}/${slug}/products/randoms`;

  return fetcher(url, {
    method: "GET",
  });
};

export const findStores = (slug) => {
  const url = `${ENDPOINT}/${slug}/stores`;

  return fetcher(url, {
    method: "GET",
  });
};
