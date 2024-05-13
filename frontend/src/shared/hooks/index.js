import { useEffect, useState, useRef } from "react";
export * from "./use-document-title";
export * from "./use-local-search-params";

//TODO: Get those into a individual file

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

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState(null);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
};

export const useIsFirstRender = () => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
};
