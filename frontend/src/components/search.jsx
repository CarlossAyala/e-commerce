import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { useState } from "react";

export const Search = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    params.delete("q");
    params.delete("page");
    if (value) params.set("q", value);
    setParams(params);
  };
  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        className="max-w-md"
      />
    </div>
  );
};
