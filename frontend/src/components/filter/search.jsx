import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks";
import { Input } from "../ui/input";

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

  useEffect(() => {
    const newParams = new URLSearchParams(params);

    if (debouncedText) {
      newParams.set(name, debouncedText);
    } else {
      newParams.delete(name);
    }

    setParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  useEffect(() => {
    if (!paramValue) setValue("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramValue]);

  return (
    <div className="w-full sm:max-w-sm">
      <Input
        type={type}
        className="h-8"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
