export const isEven = (num) => {
  return num % 2 === 0;
};

export const splitFloat = (num) => {
  const int = Math.floor(+num);
  const float = (num - int).toFixed(1);

  return [int, float];
};
