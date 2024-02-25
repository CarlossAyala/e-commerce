export * from "./formatter";
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

export const getInitials = (fullName) => {
  const names = fullName.split(" ");
  const initials = names.map((name) => name[0]);
  return initials.length > 3
    ? initials.slice(0, 2).join("").concat("...")
    : initials.join("");
};
