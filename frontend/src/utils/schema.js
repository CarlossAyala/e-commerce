export const parseNumber = (num) => {
  return isNaN(num) ? null : num;
};
export const parseString = (str) => {
  return str === "" ? null : str;
};
