import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@/components";
import { cn } from "@/libs";
import { CATEGORY_TYPES } from "../utils";
import { detachCategoryInitial, detachCategorySchema } from "../schemas";
import { useDetachCategory, useGetCategories } from "../queries";

const { MAIN } = CATEGORY_TYPES;

export const Detach = () => {
  useDocumentTitle("Detach Category");
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const { data, isLoading, isError, error } = useGetCategories();
  const detach = useDetachCategory();

  const form = useForm({
    resolver: yupResolver(detachCategorySchema),
    defaultValues: detachCategoryInitial,
    mode: "onSubmit",
  });

  const handleDetach = (values) => {
    detach.mutate(
      { categoryId, values },
      {
        onSuccess() {
          toast("Categories detached");
          detach.reset();
          form.reset();
        },
      },
    );
  };

  const mainCategories = data?.filter((category) => category.type === MAIN);

  const hasMainCategories = mainCategories?.length > 0;
  const category = data?.find((category) => category.id === categoryId);

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Detach Category
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !hasMainCategories ? (
        <EmptyPlaceholder
          title="No categories"
          description="No main categories to detach."
        />
      ) : (
        <>
          <Popover open={open} onOpenChange={setOpen}>
            <div className="space-y-2">
              <h3 className="font-medium leading-tight tracking-tight">
                Main Category
              </h3>

              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-label="Select category..."
                  aria-expanded={open}
                  className="w-80 flex-1 justify-between font-normal"
                >
                  {categoryId ? category.name : "Select category..."}
                  <ChevronUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-80 p-0">
              <Command
                filter={(value, search) => {
                  return value.toLowerCase().includes(search.toLowerCase());
                }}
              >
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {mainCategories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.name}
                      onSelect={() => {
                        setCategoryId(
                          categoryId === category.id ? "" : category.id,
                        );
                        setOpen(false);
                      }}
                    >
                      {category.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto size-4",
                          categoryId === category.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {!categoryId ? (
            <EmptyPlaceholder
              title="No category selected"
              description="Please select a category to detach"
            />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleDetach)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="categoriesId"
                  render={() => (
                    <FormItem className="space-y-2">
                      <h3 className="font-medium leading-tight tracking-tight">
                        Sub-categories
                      </h3>

                      {category.children.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No sub-categories to detach
                        </p>
                      ) : (
                        <>
                          <FormMessage />
                          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                            {category.children.map((_category) => (
                              <FormField
                                key={_category.id}
                                control={form.control}
                                name="categoriesId"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={_category.id}
                                      className="flex items-center space-x-2 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            _category.id,
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  _category.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) =>
                                                      value !== _category.id,
                                                  ),
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {_category.name}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={detach.isLoading}>
                  {detach.isLoading && <Spinner className="mr-2 size-4" />}
                  Detach
                </Button>
              </form>
            </Form>
          )}
        </>
      )}
    </main>
  );
};
