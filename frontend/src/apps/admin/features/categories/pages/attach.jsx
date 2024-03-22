import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
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
  Skeleton,
  Spinner,
} from "@/components";
import { cn } from "@/libs";
import { attachCategoryInitial, attachCategorySchema } from "../schemas";
import { CATEGORY_TYPES, categoryActionRoutes } from "../utils";
import { useAttachCategory, useGetCategories } from "../queries";
import { useDocumentTitle } from "@/shared/hooks";

const { MAIN, SINGLE } = CATEGORY_TYPES;

export const Attach = () => {
  useDocumentTitle("Attach Category");
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const attach = useAttachCategory();

  const { data, isLoading, isError, error } = useGetCategories();

  const form = useForm({
    resolver: yupResolver(attachCategorySchema),
    defaultValues: attachCategoryInitial,
    mode: "onSubmit",
  });

  const handleAttach = (values) => {
    attach.mutate(
      { categoryId, values },
      {
        onSuccess() {
          toast("Categories attached");
          attach.reset();
          form.reset();
        },
      },
    );
  };

  const category = data?.find((category) => category.id === categoryId);
  const isEmpty = data?.length === 0;
  const hasMainCategories = data?.some((category) => category.type === MAIN);

  const selectedMainCategory = data?.find(
    (category) => category.id === categoryId,
  );

  const mainCategories = data?.filter((category) => category.type === MAIN);
  const singleCategories = data?.filter((category) => category.type === SINGLE);

  const mainCategoriesFiltered = mainCategories?.filter(
    (category) => category.id !== categoryId,
  );
  const singleCategoriesFiltered = singleCategories?.filter(
    (category) => category.id !== categoryId,
  );

  return (
    <main className="flex-1 space-y-6 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Attach Category
      </h2>

      {isLoading ? (
        <section className="space-y-2">
          <div>
            <h3 className="font-medium leading-tight tracking-tight">
              Main Category
            </h3>
            <p className="text-sm text-muted-foreground">
              You can attach any subcategory of other main categories and single
              categories
            </p>
          </div>

          <Skeleton className="h-9 w-80" />
        </section>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No categories"
          description="No categories to attach"
        />
      ) : !hasMainCategories ? (
        <EmptyPlaceholder
          title="No categories"
          description="No main categories to attach"
        />
      ) : (
        <>
          <Popover open={open} onOpenChange={setOpen}>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium leading-tight tracking-tight">
                  Main Category
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can attach any subcategory of other main categories and
                  single categories
                </p>
              </div>

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

              <div className="space-y-1">
                <h3 className="font-medium leading-tight tracking-tight">
                  Sub-categories
                </h3>

                {!selectedMainCategory ? null : selectedMainCategory.children
                    .length > 0 ? (
                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {selectedMainCategory.children.map((_category) => (
                      <li key={_category.id}>
                        <Link
                          to={categoryActionRoutes.details(_category.id)}
                          className="text-sm hover:text-blue-600"
                        >
                          {_category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No subcategories found.
                  </p>
                )}
              </div>
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
              description="Please select a category to attach"
            />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAttach)}
                className="space-y-6"
              >
                <Button type="submit" disabled={attach.isLoading}>
                  {attach.isLoading && <Spinner className="mr-2 size-4" />}
                  Attach
                </Button>

                <FormField
                  control={form.control}
                  name="categoriesId"
                  render={() => (
                    <FormItem className="space-y-2">
                      <h3 className="font-medium leading-tight tracking-tight">
                        Single Categories
                      </h3>

                      {singleCategoriesFiltered.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No single categories to attach
                        </p>
                      ) : (
                        <>
                          <FormMessage />
                          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                            {singleCategoriesFiltered.map((_category) => (
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

                <FormField
                  control={form.control}
                  name="categoriesId"
                  render={() => (
                    <FormItem className="space-y-2">
                      <h3 className="font-medium leading-tight tracking-tight">
                        Main Categories
                      </h3>

                      {mainCategoriesFiltered.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No main categories to attach
                        </p>
                      ) : (
                        <>
                          <FormMessage />
                          <ul className="space-y-4">
                            {mainCategoriesFiltered.map((_category) => (
                              <li key={_category.id} className="space-y-2">
                                <h4 className="text-sm font-medium leading-tight tracking-tight">
                                  {_category.name}
                                </h4>

                                {_category.children.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                    {_category.children.map((subCategory) => (
                                      <FormField
                                        key={subCategory.id}
                                        control={form.control}
                                        name="categoriesId"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={subCategory.id}
                                              className="flex items-center space-x-2 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(
                                                    subCategory.id,
                                                  )}
                                                  onCheckedChange={(
                                                    checked,
                                                  ) => {
                                                    return checked
                                                      ? field.onChange([
                                                          ...field.value,
                                                          subCategory.id,
                                                        ])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) =>
                                                              value !==
                                                              subCategory.id,
                                                          ),
                                                        );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal">
                                                {subCategory.name}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">
                                    No subcategories found.
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </>
      )}
    </main>
  );
};
