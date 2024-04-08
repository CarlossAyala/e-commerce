import { useState } from "react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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

const ITEMS_PER_PAGE = new Array(10).fill(0).map((_, i) => (i + 1) * 10);
const DEFAULT_ITEM_PER_PAGE = 10;

const DUMMY_DATA = new Array(103).fill(0).map((_, i) => i + 1);

export const LocalPagination = ({ data = DUMMY_DATA }) => {
  const count = data.length;

  const [itemsPopover, setItemsPopover] = useState(false);
  const [pagePopover, setPagePopover] = useState(false);

  const [params, setParams] = useState(
    new URLSearchParams({ items: DEFAULT_ITEM_PER_PAGE, page: 1 }),
  );

  const items = params.get("items");
  const page = params.get("page");

  const leftRows = Math.min(items * (page - 1) + 1, count);
  const rightRows = Math.min(page * items, count);

  const totalRows = Math.max(Math.ceil(count / items), 1);

  return (
    <div>
      Params: {params.toString()}
      <section className="flex justify-between gap-2">
        <Popover open={itemsPopover} onOpenChange={setItemsPopover}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-24 p-2">
              Items {items}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-24 p-0">
            <Command>
              <CommandGroup className="max-h-48 overflow-y-auto">
                {ITEMS_PER_PAGE.map((row) => (
                  <CommandItem
                    key={row}
                    value={row}
                    onSelect={(_row) => {
                      const newParams = new URLSearchParams(params);
                      newParams.set("items", _row);
                      setParams(newParams);

                      setItemsPopover(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 size-4",
                        items == row ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {row}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex h-9 items-center text-sm text-muted-foreground">
          <p>
            <span>
              {leftRows}-{rightRows}
            </span>
            <span> of </span>
            <span>{count}</span>
          </p>
        </div>

        <Popover open={pagePopover} onOpenChange={setPagePopover}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-24 p-2">
              Page {page}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandGroup className="max-h-48 overflow-y-auto">
                {new Array(totalRows).fill(0).map((_, i) => (
                  <CommandItem
                    key={i}
                    value={i + 1}
                    onSelect={(_row) => {
                      const newParams = new URLSearchParams(params);
                      newParams.set("page", _row);
                      setParams(newParams);

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

        <div className="flex gap-2">
          <Button size="icon" variant="outline">
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button size="icon" variant="outline">
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};
