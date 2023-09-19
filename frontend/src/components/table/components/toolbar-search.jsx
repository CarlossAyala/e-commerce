import { useState } from "react";
import { Input } from "../../ui/input";
import { useSearchParams } from "react-router-dom";

const ToolbarSearch = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");

  const handleChange = (event) => {
    setSearch(event.target.value);
    params.delete("q");
    if (event.target.value) {
      params.set("q", event.target.value);
    }
    setParams(params);
  };

  return (
    <Input
      placeholder="Search"
      value={search}
      onChange={handleChange}
      className="max-w-md"
    />
  );
};

export default ToolbarSearch;
