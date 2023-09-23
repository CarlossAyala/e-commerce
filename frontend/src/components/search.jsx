import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

export const Search = ({ label = true }) => {
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
      {label && <Label htmlFor="search">Search</Label>}
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
