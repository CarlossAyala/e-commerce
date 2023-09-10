export const urlWithQuery = (url, query) => {
  return `${url}${query ? `?${query}` : ""}`;
};
