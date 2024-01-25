import { useState } from "react";
import {
  Badge,
  Button,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "../../../../../components";
import { StoresDisplay } from "../components/stores-display";
import { StoresFilters } from "../components/stores-filters";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const Stores = () => {
  return (
    <main className="container max-w-6xl space-y-6">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Stores</h2>
        <p className="text-sm text-muted-foreground">
          Your favorite brands are already on Fake-Commerce.
        </p>
      </section>

      <section>
        <Filter />
      </section>

      <section className="flex gap-10">
        <StoresFilters className="hidden w-full max-w-[240px] shrink-0 sm:block" />
        <StoresDisplay className="grow" />
      </section>
    </main>
  );
};

const VALUES = ["OptionOne", "OptionTwo", "OptionThree", "OptionFour"];
const options = VALUES.map((value) => ({ value, label: value }));
const Filter = () => {
  const [values, setValues] = useState(new Set(VALUES));

  const title = "Test";

  return (
    <div className="max-w-xs">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 items-center border-dashed"
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            {title}
            {values.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />

                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {values.size}
                </Badge>

                <div className="hidden space-x-1 lg:flex">
                  {values.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {values.size} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => values.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-52 p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value);
                        } else {
                          selectedValues.add(option.value);
                        }
                        const filterValues = Array.from(selectedValues);
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined,
                        );
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
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                      {facets?.get(option.value) && (
                        <span className="font-mono ml-auto flex h-4 w-4 items-center justify-center text-xs">
                          {facets.get(option.value)}
                        </span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
