import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
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
  Skeleton,
} from "@/components";
import { cn } from "@/libs";
import { detachCategoryInitial, detachCategorySchema } from "../schemas";
import { useDetachCategory, useGetCategories } from "../queries";

export const Detach = () => {
  useDocumentTitle("Detach Category");
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const { data: categories, isLoading, isError, error } = useGetCategories();
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
          form.reset();
        },
      },
    );
  };

  const mains = categories?.filter((category) => !category.parentId);

  const category = categories?.find((category) => category.id === categoryId);

  return (
    <main className="flex-1 space-y-4 px-6 pb-10">
      <section className="mt-4 flex justify-between">
        <PageHeaderHeading>Detach Category</PageHeaderHeading>
        <Button
          form="category-detach"
          type="submit"
          disabled={
            isLoading ||
            !categoryId ||
            detach.isLoading ||
            !category.children.length
          }
        >
          {detach.isLoading && <Spinner className="mr-2 size-4" />}
          Detach
        </Button>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="font-medium">Main Category</h3>
          <p className="text-sm text-muted-foreground">
            You can detach any subcategory of the main categories
          </p>
        </div>

        {isLoading ? (
          <Skeleton className="h-9 w-1/4" />
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : !categories.length ? (
          <EmptyState
            title="No categories"
            description="No main categories to detach."
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
                    <ChevronUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
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
                    {mains.map((_category) => (
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
                <h3 className="font-medium">Sub Categories</h3>

                {category.children.length ? (
                  <Form {...form}>
                    <form
                      id="category-detach"
                      onSubmit={form.handleSubmit(handleDetach)}
                    >
                      <FormField
                        control={form.control}
                        name="categoriesId"
                        render={() => (
                          <FormItem className="space-y-2">
                            {category.children.length ? (
                              <>
                                <FormMessage />
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 lg:grid-cols-4">
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
                                                            value !==
                                                            _category.id,
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
                                  No sub-categories to detach
                                </p>
                              </div>
                            )}
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      No subcategories found
                    </p>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
};
