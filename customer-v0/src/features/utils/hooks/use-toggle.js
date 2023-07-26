import { useState } from 'react';

const useToggle = (defaultValue) => {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = () => setValue((currentValue) => !currentValue);

  return [value, toggle, setValue];
};

export default useToggle;
