import { useState } from 'react';

const useBoolean = (initial = false) => {
  const [value, setValue] = useState(initial);

  const open = () => setValue(true);
  const close = () => setValue(false);
  const toggle = () => setValue((current) => !current);

  // [value, handler]
  return [value, { open, close, toggle }];
};

export default useBoolean;
