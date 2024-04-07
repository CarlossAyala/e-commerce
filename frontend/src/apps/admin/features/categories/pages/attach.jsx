import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState, PageHeaderHeading, Spinner } from "@/shared/components";
import {
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Skeleton,
} from "@/components";
import { cn } from "@/libs";
import { attachCategoryInitial, attachCategorySchema } from "../schemas";
import { CATEGORY_TYPES } from "../utils";
import { useAttachCategory, useGetCategories } from "../queries";

const { MAIN, SINGLE } = CATEGORY_TYPES;

export const Attach = () => {
  useDocumentTitle("Attach Category");
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const attach = useAttachCategory();

  const { data: categories, isLoading, isError, error } = useGetCategories();

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
          form.reset();
        },
      },
    );
  };

  const category = categories?.find((category) => category.id === categoryId);

  const hasMainCategories = categories?.some(
    (category) => category.type === MAIN,
  );

  const mainCategories = categories?.filter(
    (category) => category.type === MAIN,
  );
  const singleCategories = categories?.filter(
    (category) => category.type === SINGLE,
  );

  const othersMainCategories = mainCategories?.filter(
    (category) => category.id !== categoryId,
  );

  return (
    <main className="flex-1 space-y-4 px-6 pb-10">
      <section className="mt-4 flex justify-between">
        <PageHeaderHeading>Attach Category</PageHeaderHeading>
        <Button
          form="category-attach"
          type="submit"
          disabled={isLoading || !categoryId || attach.isLoading}
        >
          {attach.isLoading && <Spinner className="mr-2 size-4" />}
          Attach
        </Button>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="font-medium">Main Category</h3>
          <p className="text-sm text-muted-foreground">
            You can attach any subcategory of other main categories and single
            categories
          </p>
        </div>

        {isLoading ? (
          <Skeleton className="h-9 w-1/4" />
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : !categories.length ? (
          <EmptyState
            title="No categories"
            description="No categories to attach"
          />
        ) : !hasMainCategories ? (
          <EmptyState
            title="No categories"
            description="No main categories to attach"
          />
        ) : (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <div className="flex gap-2">
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-label="Select a category..."
                    aria-expanded={open}
                    className="w-80 grow-0 justify-between"
                  >
                    {categoryId ? category.name : "Select a category..."}
                    <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                {categoryId && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setCategoryId(null)}
                  >
                    <XMarkIcon className="size-4" />
                  </Button>
                )}
              </div>
              <PopoverContent className="w-80 p-0">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandEmpty>No categories found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {mainCategories.map((_category) => (
                      <CommandItem
                        key={_category.id}
                        value={_category.name}
                        onSelect={() => {
                          setCategoryId(_category.id);
                          setOpen(false);
                        }}
                      >
                        {_category.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto size-4",
                            categoryId === _category.id
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

            {categoryId && (
              <section className="space-y-2">
                <h4 className="font-medium">Sub Categories</h4>

                {category.children.length ? (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 lg:grid-cols-4">
                    {category.children.map((category) => (
                      <li key={category.id}>
                        <p className="text-sm">{category.name}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      No subcategories found
                    </p>
                  </div>
                )}
              </section>
            )}

            <Separator />

            {!categoryId ? (
              <EmptyState
                title="No category selected"
                description="Please select a category to attach"
              />
            ) : (
              <Form {...form}>
                <form
                  id="category-attach"
                  onSubmit={form.handleSubmit(handleAttach)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="categoriesId"
                    render={() => (
                      <FormItem className="space-y-2">
                        <h3 className="font-medium">Single Categories</h3>

                        {singleCategories.length ? (
                          <>
                            <FormMessage />
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 lg:grid-cols-4">
                              {singleCategories.map((_category) => (
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
                                            checked={field.value.some(
                                              (_categoryId) =>
                                                _categoryId === _category.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    _category.id,
                                                  ])
                                                : field.onChange(
                                                    field.value.filter(
                                                      (value) =>
                                                        value !== _category.id,
                                                    ),
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal leading-4">
                                          {_category.name}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          </>
                        ) : (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              No single categories to attach
                            </p>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoriesId"
                    render={() => (
                      <FormItem className="space-y-2">
                        <h3 className="font-medium">Main Categories</h3>

                        {othersMainCategories.length ? (
                          <>
                            <FormMessage />
                            <ul className="space-y-4">
                              {othersMainCategories.map((_category) => (
                                <li key={_category.id} className="space-y-2">
                                  <h4 className="text-sm font-medium">
                                    {_category.name}
                                  </h4>

                                  {_category.children.length ? (
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 lg:grid-cols-4">
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
                                                    checked={field.value?.some(
                                                      (_categoryId) =>
                                                        _categoryId ===
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
                                                            field.value.filter(
                                                              (value) =>
                                                                value !==
                                                                subCategory.id,
                                                            ),
                                                          );
                                                    }}
                                                  />
                                                </FormControl>
                                                <FormLabel className="font-normal leading-4">
                                                  {subCategory.name}
                                                </FormLabel>
                                              </FormItem>
                                            );
                                          }}
                                        />
                                      ))}
                                    </div>
                                  ) : (
                                    <div>
                                      <p className="text-sm text-muted-foreground">
                                        No subcategories
                                      </p>
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              No main categories to attach
                            </p>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </>
        )}
      </section>
    </main>
  );
};
