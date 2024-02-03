import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { OptionItem } from "./option-item";
import { ClearFilter } from "./clear-filter";

export const FilterFullOption = ({
  headline,
  name,
  items = [],
  isLoading,
  isError,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();

  const paramValue = params.get(name);
  const value = items.find((item) => item.value === paramValue);

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete(name);

    setParams(newParams);
    setOpen(false);
  };

  const hasItems = items.length > 0;

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
          {value && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />

              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                1
              </Badge>

              <div className="hidden lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {value.label}
                </Badge>
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

        <section className="grid max-h-56 w-full overflow-auto px-2 py-1">
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
              <OptionItem key={index} name={name} {...item} />
            ))
          ) : (
            <div className="overflow-x-auto py-6 text-center text-sm">
              <p>No result for:</p>
              <p className="italic">{search}</p>
            </div>
          )}
        </section>

        {value && <ClearFilter handleClearFilter={handleClearFilter} />}
      </PopoverContent>
    </Popover>
  );
};
