export const nonEmptyValues = (values) => {
  return Object.entries(values)
    .filter(([key, value]) => value !== '')
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
};
