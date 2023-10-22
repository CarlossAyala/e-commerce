import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { categoryTypes } from "../utils";
import { detachCategoryInitial, detachCategorySchema } from "../schemas";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  useToast,
} from "../../../../../components";
import { useDetachCategory } from "../queries";

export const FormDetachCategory = ({ categories }) => {
  const { toast } = useToast();
  const detach = useDetachCategory();

  const form = useForm({
    resolver: yupResolver(detachCategorySchema),
    defaultValues: detachCategoryInitial,
    mode: "onSubmit",
  });

  const handleAttach = (values) => {
    detach.mutate(values, {
      onSuccess: () => {
        toast({
          description: "Categories detached",
        });
        form.resetField("categoriesId");
        detach.reset();
      },
      onError(error) {
        toast({
          title: "Categories could not be detached",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const mainCategories = categories.filter((category) => {
    return category.type === categoryTypes.main;
  });

  const categoryId = form.watch("categoryId");
  const category = mainCategories.find((category) => {
    return category.id === categoryId;
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAttach)} className="space-y-6">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="max-w-sm space-y-2">
              <div>
                <FormLabel className="mb-0 text-base">Main category</FormLabel>
                <FormDescription>
                  Select a main category to detach.
                </FormDescription>
              </div>
              {mainCategories.length > 0 ? (
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mainCategories.map((_category) => (
                      <SelectItem key={_category.id} value={_category.id}>
                        {_category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  No main categories found.
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoriesId"
          render={() => (
            <FormItem className="space-y-1">
              <FormLabel className="mb-0 text-base">Sub-categories</FormLabel>
              <FormMessage />
              {categoryId ? (
                category.children.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {category.children.map((children) => (
                      <FormField
                        key={children.id}
                        control={form.control}
                        name="categoriesId"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={children.id}
                              className="flex flex-row items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(children.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          children.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== children.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs font-normal">
                                {children.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No sub-categories found.
                  </p>
                )
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  Select a main category to view sub-categories.
                </p>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" disabled={detach.isLoading}>
          {detach.isLoading && (
            <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Detach
        </Button>
      </form>
    </Form>
  );
};

FormDetachCategory.Skeleton = function FormDetachCategorySkeleton() {
  return (
    <div className="space-y-6">
      <section className="max-w-sm space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
      </section>
      <section className="space-y-2">
        <Skeleton className="h-5 w-36" />

        <div className="grid grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
        </div>
      </section>

      <Skeleton className="h-9 w-24" />
    </div>
  );
};
