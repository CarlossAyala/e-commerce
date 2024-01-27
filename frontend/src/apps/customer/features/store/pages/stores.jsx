import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Switch,
} from "../../../../../components";
import { StoresDisplay } from "../components/stores-display";
import { StoresFilters } from "../components/stores-filters";
import {
  CheckIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "../../../../../libs/utils";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../../../hooks";

const ITEMS = [
  "Option One",
  "Option Two",
  "Option Three",
  "Option Four",
  "Your favorite",
];
const options_one = {
  title: "ComboBoxes",
  name: "combo_boxes",
  items: ITEMS.map((value) => ({ value, label: value })),
};
const options_two = {
  title: "Options",
  name: "options",
  items: ITEMS.map((value) => ({ value, label: value })),
};

const variety_one = [
  {
    filter_type: "input",
    type: "number",
    name: "price",
    label: "Price",
    placeholder: "Price",
  },
  {
    filter_type: "input",
    type: "text",
    name: "tag",
    label: "Tag",
    placeholder: "Tag",
  },
  {
    filter_type: "switch",
    headline: "Switch group",
    items: [
      {
        name: "switch_1",
        label: "Switch 1",
        value: "switch_1",
      },
      {
        name: "switch_2",
        label: "Switch 2",
        value: "switch_2",
      },
    ],
  },
  {
    filter_type: "multiple",
    headline: "Checkbox group",
    name: "checkbox",
    items: [
      {
        label: "Checkbox 1",
        value: "checkbox_1",
      },
      {
        label: "Checkbox 2",
        value: "checkbox_2",
      },
      {
        label: "Checkbox 3",
        value: "checkbox_3",
      },
    ],
  },
  {
    filter_type: "single",
    headline: "Option group",
    name: "option",
    items: [
      {
        label: "Option 1",
        value: "option_1",
      },
      {
        label: "Option 2",
        value: "option_2",
      },
      {
        label: "Option 3",
        value: "option_3",
      },
    ],
  },
];

export const Stores = () => {
  const [params] = useSearchParams();

  return (
    <main className="container space-y-4">
      <section className="mt-2">
        <h2 className="text-2xl font-semibold tracking-tight">Stores</h2>
        <p className="text-sm text-muted-foreground">
          Your favorite brands are already on Fake-Commerce.
        </p>
      </section>

      <section className="flex flex-1 flex-wrap items-center gap-2">
        <FilterCheckbox {...options_one} />
        <FilterOption {...options_two} />
        <Filter title="Price" filters={variety_one} />
        <FilterReset names={[...getVarietyActiveNames(params, variety_one)]} />
      </section>

      <section className="flex gap-10">
        <StoresFilters className="hidden w-full max-w-[240px] shrink-0 sm:block" />
        <StoresDisplay className="grow" />
      </section>
    </main>
  );
};

const FilterCheckbox = ({ title, name, items }) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useSearchParams();

  const values = new Set(params.getAll(name));

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete(name);

    setParams(newParams);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
                  Array.from(values.values()).map((label, index) => (
                    <Badge
                      variant="secondary"
                      key={index}
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
      <PopoverContent className="w-full max-w-52 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((option) => {
                const isSelected = values.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      const newParams = new URLSearchParams(params);

                      if (isSelected) {
                        newParams.delete(name, option.value);
                      } else {
                        newParams.append(name, option.value);
                      }
                      setParams(newParams);
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
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {values.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearFilter}
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
  );
};
const FilterOption = ({ title, name, items }) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useSearchParams();

  const value = items.find((item) => item.value === params.get(name));

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete(name);

    setParams(newParams);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 items-center border-dashed"
        >
          <PlusCircleIcon className="mr-2 h-4 w-4 shrink-0" />
          {title}
          {value && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />

              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                1
              </Badge>

              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {value}
                </Badge>
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
              {items.map((option) => {
                const isSelected = value === option.value;

                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      const newParams = new URLSearchParams(params);

                      if (isSelected) {
                        newParams.delete(name);
                      } else {
                        newParams.delete(name);
                        newParams.append(name, option.value);
                      }
                      setParams(newParams);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {value > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearFilter}
                    className="justify-center text-center"
                  >
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FilterInput = ({ name, label, placeholder, type }) => {
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState(params.get(name) ? params.get(name) : "");

  const debouncedText = useDebounced(value);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const newParams = new URLSearchParams(params);

    if (debouncedText) {
      newParams.set(name, debouncedText);
    } else {
      newParams.delete(name);
    }
    setParams(newParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  return (
    <div className="grid">
      <Label htmlFor={name} className="mb-1">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        className="h-8"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
const SwitchItem = ({ name, value, label }) => {
  const [params, setParams] = useSearchParams();

  const isChecked = params.get(name);

  const handleCheckedChange = () => {
    const newParams = new URLSearchParams(params);

    if (isChecked) {
      newParams.delete(name);
    } else {
      newParams.append(name, value);
    }
    setParams(newParams);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={name}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor={name} className="mb-0 font-normal text-foreground">
        {label}
      </Label>
    </div>
  );
};
const FilterSwitch = ({ headline, items }) => {
  return (
    <div className="grid">
      <Label>{headline}</Label>
      <div className="grid space-y-2">
        {items.map((item, index) => (
          <SwitchItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
const MultipleItem = ({ name, value, label }) => {
  const [params, setParams] = useSearchParams();

  const values = new Set(params.getAll(name));
  const isChecked = values.has(value);

  const handleCheckedChange = () => {
    const newParams = new URLSearchParams(params);

    if (isChecked) {
      newParams.delete(name, value);
    } else {
      newParams.append(name, value);
    }
    setParams(newParams);
  };

  const checkboxID = name + "_" + value;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={checkboxID}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        name={name}
        value={value}
        className={!isChecked && "border-black/30"}
      />
      <Label htmlFor={checkboxID} className="mb-0 font-normal text-foreground">
        {label}
      </Label>
    </div>
  );
};
const FilterMultiple = ({ headline, name, items }) => {
  return (
    <div className="grid">
      <Label htmlFor={name}>{headline}</Label>
      <div className="grid gap-2">
        {items.map((item, index) => (
          <MultipleItem key={index} name={name} {...item} />
        ))}
      </div>
    </div>
  );
};
const SingleItem = ({ name, value, label }) => {
  const [params, setParams] = useSearchParams();

  const isSelected = params.get(name) === value;

  const handleCheckedChange = () => {
    const newParams = new URLSearchParams(params);

    if (isSelected) {
      newParams.delete(name);
    } else {
      newParams.delete(name);
      newParams.append(name, value);
    }

    setParams(newParams);
  };

  const radioID = name + "_" + value;

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={radioID}
        checked={isSelected}
        onCheckedChange={handleCheckedChange}
        name={name}
        value={value}
        className={cn("rounded-full", !isSelected && "border-black/30")}
      />
      <Label htmlFor={radioID} className="mb-0 font-normal text-foreground">
        {label}
      </Label>
    </div>
  );
};
const FilterSingle = ({ headline, name, items }) => {
  return (
    <div className="grid">
      <Label htmlFor={name}>{headline}</Label>
      <div className="grid gap-2">
        {items.map((item, index) => (
          <SingleItem key={index} name={name} {...item} />
        ))}
      </div>
    </div>
  );
};

const FILTER_TYPES = {
  input: FilterInput,
  switch: FilterSwitch,
  multiple: FilterMultiple,
  single: FilterSingle,
};

const getVarietyNames = (filters) => {
  const names = filters.map((filter) => {
    switch (filter.filter_type) {
      case "input":
        return filter.name;
      case "switch":
        return filter.items.map((option) => option.name);
      case "multiple":
        return filter.name;
      case "single":
        return filter.name;
    }
  });

  return names.flat();
};
const getVarietyActiveValues = (params, filters) => {
  const store = new Map();

  for (const filter of filters) {
    switch (filter.filter_type) {
      case "input": {
        const inputValue = params.get(filter.name);
        if (inputValue) store.set(filter.name, [filter.label]);
        break;
      }
      case "switch": {
        for (const option of filter.items) {
          const switchValue = params.get(option.name);
          if (switchValue) store.set(option.name, [option.label]);
        }
        break;
      }
      case "multiple": {
        const multipleValues = params.getAll(filter.name);
        if (multipleValues.length) {
          const labelValues = filter.items
            .filter((option) => multipleValues.includes(option.value))
            .map((option) => option.label);
          store.set(filter.name, labelValues);
        }
        break;
      }
      case "single": {
        const singleValue = params.get(filter.name);
        if (singleValue) {
          const labelValue = filter.items.find(
            (option) => option.value === singleValue,
          ).label;
          store.set(filter.name, [labelValue]);
        }
        break;
      }
    }
  }

  return Array.from(store.values())
    .filter((item) => item.length > 0)
    .flat();
};
const getVarietyActiveNames = (params, filters) => {
  const store = new Map();

  for (const filter of filters) {
    switch (filter.filter_type) {
      case "input": {
        const inputValue = params.get(filter.name);
        if (inputValue) store.set(filter.name, [filter.name]);
        break;
      }
      case "switch": {
        for (const option of filter.items) {
          const switchValue = params.get(option.name);
          if (switchValue) store.set(option.name, [option.name]);
        }
        break;
      }
      case "multiple": {
        const multipleValues = params.getAll(filter.name);
        if (multipleValues.length) {
          store.set(filter.name, [filter.name]);
        }
        break;
      }
      case "single": {
        const singleValue = params.get(filter.name);
        if (singleValue) {
          store.set(filter.name, [filter.name]);
        }
        break;
      }
    }
  }

  return Array.from(store.values())
    .filter((item) => item.length > 0)
    .flat();
};
// TODO
const getMultipleActiveNames = (params, filters) => {};
const getSingleActiveNames = (params, filters) => {};

const Filter = ({ title, filters }) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useSearchParams();

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(params);
    const names = getVarietyNames(filters);

    for (const name of names) {
      newParams.delete(name);
    }

    setParams(newParams);
    setOpen(false);
  };

  const acceptedValues = getVarietyActiveValues(params, filters);
  const totalValues = acceptedValues.length;
  const hasMoreThanTwoValues = acceptedValues.length > 2;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 items-center border-dashed"
        >
          <PlusCircleIcon className="mr-2 h-4 w-4 shrink-0" />
          {title}
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
                  acceptedValues.map((label, index) => (
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
      <PopoverContent className="w-full max-w-52 p-0" align="start">
        <section className="max-h-56 space-y-3 overflow-auto p-2">
          {filters.map((option, index) => {
            const Filter = FILTER_TYPES[option.filter_type];

            return <Filter key={index} {...option} />;
          })}
        </section>
        {totalValues > 0 && (
          <Command className="rounded-none">
            <CommandList>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={handleClearFilters}
                  className="justify-center text-center"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

// names are a array with active filters names
const FilterReset = ({ names }) => {
  const [params, setParams] = useSearchParams();

  const handleReset = () => {
    const newParams = new URLSearchParams(params);

    for (const name of names) newParams.delete(name);

    setParams(newParams);
  };

  const hasActiveNames = names.length > 0;

  if (!hasActiveNames) return null;

  return (
    <Button variant="ghost" onClick={handleReset} className="h-8 px-2 lg:px-3">
      Reset
      <XMarkIcon className="ml-2 h-4 w-4" />
    </Button>
  );
};
