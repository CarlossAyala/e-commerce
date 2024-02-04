export * from "./formatter";
export * from "./local-storage";
export * from "./schema";

export const isEven = (num) => {
  return num % 2 === 0;
};

export const splitFloat = (num) => {
  const int = Math.floor(+num);
  const float = (num - int).toFixed(1);

  return [int, float];
};

export const clearEmptyValues = (values) => {
  const clearedValues = Object.entries(values).filter(
    ([, value]) => value !== null && value !== "",
  );

  return Object.fromEntries(clearedValues);
};

/**
 * @param {string} fullName
 * @returns {string} initials
 */
export const getInitials = (fullName) => {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

/**
 * @param {Location} location
 * @param {string} path
 * @returns {Boolean}
 */
export const isCurrentPath = (location, path, basePath) => {
  if (location.pathname === path) return true;
  else if (location.pathname.includes(path) && basePath !== path) {
    return true;
  }
};
