export const customHeaders = (headers, customHeaders) => {
  return headers.filter((header) => customHeaders.includes(header.key));
};
