import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "..";
import { FilterCheckbox } from "./filter-checkbox";
import { FilterInput } from "./filter-input";
import { FilterOption } from "./filter-option";
import { FilterSwitch } from "./filter-switch";
import { ClearFilter } from "./clear-filter";
import { getGroupActiveLabels, getGroupNames } from "./utils";

const GROUP_TYPES = {
  input: FilterInput,
  switch: FilterSwitch,
  checkbox: FilterCheckbox,
  option: FilterOption,
};
export const FilterGroup = ({ headline, groups }) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useSearchParams();

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(params);
    const names = getGroupNames(groups);

    for (const name of names) {
      newParams.delete(name);
    }

    setParams(newParams);
    setOpen(false);
  };

  const activeValues = getGroupActiveLabels(params, groups);
  const totalValues = activeValues.length;
  const hasMoreThanTwoValues = activeValues.length > 2;

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
      <PopoverContent className="w-full min-w-52 p-0" align="start">
        <section className="flex max-h-56 w-full flex-col space-y-2 overflow-auto p-2">
          {groups.map((group, index) => {
            const FilterGroupItem = GROUP_TYPES[group.filter_type];

            return <FilterGroupItem key={index} {...group} />;
          })}
        </section>

        {totalValues > 0 && (
          <ClearFilter handleClearFilter={handleClearFilters} />
        )}
      </PopoverContent>
    </Popover>
  );
};
