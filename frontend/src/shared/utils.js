export const parseURLSearchParams = (params = "") => {
  return Object.fromEntries(new URLSearchParams(params));
};
