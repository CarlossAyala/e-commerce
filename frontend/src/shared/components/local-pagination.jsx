import { useState } from "react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import { cn } from "@/libs";
import { ITEMS_PER_PAGE } from "../utils";

export const LocalPagination = ({ count = 0, params, setParams }) => {
  const [itemsPopover, setItemsPopover] = useState(false);
  const [pagePopover, setPagePopover] = useState(false);

  const page = params.get("page");
  const items = params.get("limit");

  const leftItems = Math.min(items * (page - 1) + 1, count);
  const rightItems = Math.min(page * items, count);

  const totalPages = Math.max(Math.ceil(count / items), 1);

  const canGoForward = page < totalPages;
  const canGoBackward = page > 1;

  const handleNext = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", +page + 1);
    setParams(newParams);
  };
  const handlePrev = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", +page - 1);
    setParams(newParams);
  };
  const handleFirst = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", 1);
    setParams(newParams);
  };
  const handleLast = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", totalPages);
    setParams(newParams);
  };
  const handleItems = (items) => {
    const newParams = new URLSearchParams(params);
    newParams.set("limit", items);
    newParams.set("page", 1);
    setParams(newParams);
  };
  const handleGoTo = (page) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", page);
    setParams(newParams);
  };

  return (
    <section className="space-y-2">
      <div className="flex justify-between gap-2">
        <Popover open={itemsPopover} onOpenChange={setItemsPopover}>
          <PopoverTrigger asChild>
            <Button variant="outline" type="button" className="w-24 p-2">
              Items {items}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-24 p-0">
            <Command>
              <CommandGroup className="max-h-48 overflow-y-auto">
                {ITEMS_PER_PAGE.map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={(value) => {
                      handleItems(value);
                      setItemsPopover(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 size-4",
                        items == item ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={pagePopover} onOpenChange={setPagePopover}>
          <PopoverTrigger asChild>
            <Button variant="outline" type="button" className="w-24 p-2">
              Page {page}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandGroup className="max-h-48 overflow-y-auto">
                {new Array(totalPages).fill(0).map((_, i) => (
                  <CommandItem
                    key={i}
                    value={i + 1}
                    onSelect={(pageValue) => {
                      handleGoTo(pageValue);

                      setPagePopover(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 size-4",
                        page == i + 1 ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {i + 1}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleFirst}
            disabled={!canGoBackward}
          >
            <ChevronDoubleLeftIcon className="size-4" />
          </Button>
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={!canGoBackward}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
        </div>

        <div className="flex h-9 items-center text-sm text-muted-foreground">
          <p>
            <span>
              {leftItems}-{rightItems}
            </span>
            <span> of </span>
            <span>{count}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleNext}
            disabled={!canGoForward}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleLast}
            disabled={!canGoForward}
          >
            <ChevronDoubleRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
