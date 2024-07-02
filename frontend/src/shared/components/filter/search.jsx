import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "@/shared/hooks";
import { Input } from "..";

export const Search = ({
  name = "q",
  placeholder = "Search",
  type = "text",
}) => {
  const [params, setParams] = useSearchParams();
  const paramValue = params.get(name);
  const [value, setValue] = useState(paramValue ? paramValue : "");

  const debouncedText = useDebounced(value);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const newParams = new URLSearchParams(params);

    if (debouncedText) {
      newParams.set(name, debouncedText);
    } else {
      newParams.delete(name);
    }

    setParams(newParams);
  }, [debouncedText]);

  useEffect(() => {
    if (!paramValue) setValue("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramValue]);

  return (
    <Input
      type={type}
      className="h-9 sm:max-w-sm"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};
