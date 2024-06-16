import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Util function to fetch data
 *
 * @param { string | URL } input - URL to fetch
 * @param { RequestInit } init - Request init
 */
export const fetcher = async (input, init) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    const info = await response.json();
    throw new Error(info?.message ?? response.statusText);
  }

  return await response.json();
};
