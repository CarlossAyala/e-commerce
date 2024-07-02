import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "..";
import { CheckboxItem } from "./checkbox-item";
import { ClearFilter } from "./clear-filter";
import { getCheckboxActiveLabels } from "./utils";

export const FilterFullCheckbox = ({
  headline,
  name,
  items = [],
  isLoading,
  isError,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete(name);

    setParams(newParams);
    setOpen(false);
  };

  const hasItems = items.length > 0;

  const activeValues = getCheckboxActiveLabels(params, name, items);
  const totalValues = activeValues.length;
  const hasMoreThanTwoValues = activeValues.length > 2;

  const searchResult = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 items-center border-dashed"
        >
          <PlusCircleIcon className="mr-2 h-4 w-4 shrink-0" />
          {headline}
          {totalValues > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />

              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {totalValues}
              </Badge>

              <div className="hidden space-x-1 lg:flex">
                {hasMoreThanTwoValues ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {totalValues} active
                  </Badge>
                ) : (
                  activeValues.map((label, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {label}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-44 max-w-52 p-0" align="start">
        <section className="flex items-center gap-2 border-b px-2">
          <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" />
          <Input
            className="h-9 w-full border-none px-0 shadow-none focus-visible:outline-none focus-visible:ring-0"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </section>

        <section className="grid max-h-56 w-full gap-2 overflow-auto px-2 py-1">
          {isLoading ? (
            <div className="py-6 text-center text-sm">Loading...</div>
          ) : isError ? (
            <div className="py-6 text-center text-sm">
              Error loading {headline}
            </div>
          ) : !hasItems ? (
            <div className="py-6 text-center text-sm">{headline} empty!</div>
          ) : searchResult.length > 0 ? (
            searchResult.map((item, index) => (
              <CheckboxItem key={index} name={name} {...item} />
            ))
          ) : (
            <div className="py-6 text-center text-sm">
              <p>No result for:</p>
              <p className="italic">{search}</p>
            </div>
          )}
        </section>

        {totalValues > 0 && (
          <ClearFilter handleClearFilter={handleClearFilter} />
        )}
      </PopoverContent>
    </Popover>
  );
};
