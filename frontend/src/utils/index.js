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
