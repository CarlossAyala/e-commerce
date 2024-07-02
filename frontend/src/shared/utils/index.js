import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export * from "./formatter";
export * from "./schema";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const clearEmptyValues = (values) => {
  const clearedValues = Object.entries(values).filter(
    ([, value]) => value !== null && value !== "",
  );

  return Object.fromEntries(clearedValues);
};

export const getInitials = (fullName = "") => {
  const names = fullName.split(" ");
  const initials = names.map((name) => name[0]);
  return initials.length > 3
    ? initials.slice(0, 2).join("").concat("...")
    : initials.join("");
};

export const getFullName = (user = {}) => {
  const { name, lastName } = user;
  return `${name} ${lastName}`;
};

/**
 * Util function to fetch data
 *
 * @param { string | URL } input - URL to fetch
 * @param { RequestInit } init - Request init
 */
export const fetcher = async (input, init) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    const info = await response.json().catch(() => ({}));
    const error = new Error(info?.message ?? response.statusText);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export const parseURLSearchParams = (params = "") => {
  return Object.fromEntries(new URLSearchParams(params));
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Determines the current app based on the provided route.
 *
 * @param {string} pathname - The current route.
 * @returns {{label: string, to: string, originalTo: string,app: string}} An object containing information about the current app.
 */
export const getCurrentApp = (pathname) => {
  if (!pathname) {
    return {
      label: "E-Commerce",
      to: "/",
      originalTo: "/",
      app: "ecommerce",
    };
  }

  if (pathname.startsWith("/admin")) {
    return {
      label: "Admin",
      to: "/admin",
      originalTo: pathname,
      app: "admin",
    };
  }
  if (pathname.startsWith("/seller")) {
    return {
      label: "Seller",
      to: "/seller",
      originalTo: pathname,
      app: "seller",
    };
  }

  const originalTo = ["/signin", "/signup"].includes(pathname) ? "/" : pathname;

  return {
    label: "E-Commerce",
    to: "/",
    originalTo,
    app: "ecommerce",
  };
};

export const ITEMS_PER_PAGE = new Array(10).fill(0).map((_, i) => (i + 1) * 10);

export const paginateArray = ({ data, limit, page }) => {
  const count = data?.length;
  const start = Math.min(limit * (page - 1), count);
  const end = Math.min(page * limit, count);

  return data?.slice(start, end);
};

const IMAGE_TYPES = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export const validFileType = (file) => {
  return IMAGE_TYPES.includes(file.type);
};
export const validFileSize = (file) => {
  return file.size <= 2_000_000;
};

/**
 * Creates a query key for a given entity.
 *
 * @param {object} props - The configuration object.
 * @param {"admin" | "ecommerce" | "seller" | "auth" | "shared"} props.prefix - The prefix for the query key.
 * @param {string} props.entity - The entity name.
 * @param {object} props.config - The configuration object.
 * @param {boolean} [props.config.removeOnSignout=false] - Whether to remove the query key on signout.
 * @returns {string[]} The query key.
 */
export const createQueryKey = ({
  prefix,
  entity,
  config = {
    removeOnSignout: false,
  },
}) => {
  if (!prefix) {
    throw new Error("createQueryKey: prefix is required");
  }
  if (!entity) {
    throw new Error("createQueryKey: entity is required");
  }

  return [prefix, entity, config];
};
