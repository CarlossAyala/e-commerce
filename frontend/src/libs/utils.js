import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { APIError } from "@/utils/errors";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Util function to fetch data
 *
 * @param { string | URL } input - URL to fetch
 * @param { RequestInit } init - Request init
 *
 * @returns { Promise<any> }
 */
export const fetcher = async (input, init) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    const { error, message } = await response.json();

    throw new APIError(error, message, response.status);
  }

  return response.json();
};
