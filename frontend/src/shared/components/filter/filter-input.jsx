import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "@/shared/hooks";
import { Input, Label } from "..";

export const FilterInput = ({ name, label, placeholder, type }) => {
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState(params.get(name) ? params.get(name) : "");

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

  return (
    <div className="grid">
      <Label htmlFor={name} className="mb-1">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        className="h-8"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
