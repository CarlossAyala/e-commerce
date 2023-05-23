import { useState } from 'react';

const useCounter = (initialValue) => {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => ++x);
  const decrement = () => setCount((x) => --x);
  const reset = () => setCount(initialValue || 0);
  const set = (value) => setCount(value);

  return [count, { increment, decrement, reset, set }];
};

export default useCounter;
