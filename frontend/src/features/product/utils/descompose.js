const descompose = (n) => {
  const int = Math.floor(n);
  const float = n - int;

  return [int, float];
};

export default descompose;
