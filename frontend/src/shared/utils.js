export const parseURLSearchParams = (params = "") => {
  return Object.fromEntries(new URLSearchParams(params));
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
