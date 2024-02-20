export * from "./formatter";
export * from "./local-storage"; //TODO: delete
export * from "./storage";
export * from "./schema";

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
