const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const VERSION = import.meta.env.VITE_API_VERSION;

export const BASE_API = `${API_DOMAIN}/${VERSION}`;

export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  REMOVE: 'DELETE',
  PATCH: 'PATCH',
};

export const setupHeaders = (token = null) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  if (token) headers.append('Authorization', `Bearer ${token}`);

  return headers;
};
