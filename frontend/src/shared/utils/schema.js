export const parseNumber = (num, defaultValue = null) => {
  return Number.isNaN(num) ? defaultValue : num;
};
export const parseString = (str) => {
  return str === "" ? null : str;
};
