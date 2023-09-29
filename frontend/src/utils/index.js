export const isEven = (num) => {
  return num % 2 === 0;
};

export const splitFloat = (num) => {
  const intPart = Math.floor(num);
  const floatPart = (num - intPart).toFixed(1);

  return [intPart, floatPart];
};
