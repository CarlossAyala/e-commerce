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
 *
 * @returns { Promise<JSON> }
 */
export const fetcher = async (input, init) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error?.message || response.statusText);
  }

  return response.json();
};
