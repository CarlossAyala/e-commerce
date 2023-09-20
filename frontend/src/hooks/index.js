import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

// TODO: Add validation for prefix ["admin","seller", "customer"]
export const usePrefixApp = (value) => {
  const location = useLocation();
  const prefix = location.pathname.split("/")[1];

  return value ? value : prefix;
};

export const useDebounced = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
