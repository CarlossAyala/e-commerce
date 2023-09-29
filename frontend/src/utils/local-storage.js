const prefix = "fak-ommerce-";

export const getToken = () => {
  return JSON.parse(window.localStorage.getItem(`${prefix}token`));
};
export const setToken = (token) => {
  window.localStorage.setItem(`${prefix}token`, JSON.stringify(token));
};
export const removeToken = () => {
  window.localStorage.removeItem(`${prefix}token`);
};
