import { CheckIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../ui/command";
import { cn } from "../../../libs/utils";
import { useFilter } from "../hooks/use-filter";

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string[]} props.options
 */
const ToolbarFilterText = ({ options, title }) => {
  const { filters, add, update } = useFilter();

  /**
   * @type {Set<string> | null}
   */
  let items = filters.get(title);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-dashed">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          {title}
          {items?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="flex space-x-1">
                {items?.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {items?.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => items?.has(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option}
                        className="max-w-xs truncate rounded-sm px-1 font-normal"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-h-60 w-52 overflow-y-auto p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {items?.size > 0 && (
              <>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => update(title, new Set())}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}
            <CommandGroup>
              {options.map((option) => {
                const isSelected = items?.has(option);

                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      if (!items) {
                        add(title, new Set([option]));
                        return;
                      }
                      if (isSelected) {
                        items?.delete(option);
                      } else {
                        items?.add(option);
                      }
                      const filterValues = Array.from(items);
                      update(title, new Set(filterValues));
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{option}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ToolbarFilterText;
