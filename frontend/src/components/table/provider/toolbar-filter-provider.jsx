import { useState } from "react";
import { ToolbarFilterContext } from "../context/toolbar-filter";
import { Button } from "../../ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

/**
 *
 * @param {Object} props
 * @param {JSX.Element} props.children
 */
const ToolbarFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(new Map());

  const add = (key, value) => {
    const newFilters = new Map(filters);
    newFilters.set(key, value);
    setFilters(newFilters);
  };

  const remove = (key) => {
    const newFilters = new Map(filters);
    newFilters.delete(key);
    setFilters(newFilters);
  };

  const clear = () => {
    setFilters(new Map());
  };

  const update = (key, value) => {
    add(key, value);
  };

  const isSomeFilter = () => {
    for (const [, value] of filters.entries()) {
      if (value && value.size > 0) return true;
    }

    return false;
  };

  const hasFilters = isSomeFilter();

  const value = {
    add,
    remove,
    clear,
    update,
    filters,
  };

  return (
    <ToolbarFilterContext.Provider value={value}>
      <div className="jus flex flex-wrap items-center gap-2">
        {children}

        {hasFilters && (
          <Button
            variant="ghost"
            onClick={() => clear()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XMarkIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </ToolbarFilterContext.Provider>
  );
};

export default ToolbarFilterProvider;
