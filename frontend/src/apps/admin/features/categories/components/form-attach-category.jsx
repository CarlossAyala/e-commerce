import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { categoryTypes } from "../utils";
import { attachCategoryInitial, attachCategorySchema } from "../schemas";
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
import { useAttachCategory } from "../queries";

export const FormAttachCategory = ({ categories }) => {
  const { toast } = useToast();
  const attach = useAttachCategory();

  const form = useForm({
    resolver: yupResolver(attachCategorySchema),
    defaultValues: attachCategoryInitial,
    mode: "onSubmit",
  });

  const handleAttach = (values) => {
    attach.mutate(values, {
      onSuccess: () => {
        toast({
          description: "Category attached",
        });
        form.resetField("categoriesId");
        attach.reset();
      },
      onError(error) {
        toast({
          title: "Category could not be attached",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const categoryId = form.watch("categoryId");

  const restCategories = categories.filter((category) => {
    return category.id !== categoryId;
  });
  const singleCategories = restCategories.filter((category) => {
    return category.type === categoryTypes.single;
  });
  const listCategories = restCategories.filter((category) => {
    return category.type === categoryTypes.main;
  });
  const mainCategories = categories.filter((category) => {
    return category.type === categoryTypes.main;
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
                  Select a main category to attach.
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
              <FormLabel className="mb-0 text-base">
                Single Categories
              </FormLabel>
              <FormMessage />
              {singleCategories.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {singleCategories.map((_category) => (
                    <FormField
                      key={_category.id}
                      control={form.control}
                      name="categoriesId"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={_category.id}
                            className="flex flex-row items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(_category.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        _category.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== _category.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-xs font-normal">
                              {_category.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  No single categories found.
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoriesId"
          render={() => (
            <FormItem className="space-y-1">
              <FormLabel className="mb-0 text-base">Main Categories</FormLabel>
              <FormMessage />

              <div className="space-y-6">
                {listCategories.length > 0 ? (
                  listCategories.map((_category) => (
                    <div key={_category.id} className="space-y-2">
                      <p className="text-xs font-medium">{_category.name}</p>
                      {_category.children.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                          {_category.children.map((children) => (
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
                                        checked={field.value?.includes(
                                          children.id,
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                children.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== children.id,
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
                        <p className="text-xs italic leading-tight text-muted-foreground">
                          No sub-categories found.
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No categories found.
                  </p>
                )}
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={attach.isLoading}>
          {attach.isLoading && (
            <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Attach
        </Button>
      </form>
    </Form>
  );
};

FormAttachCategory.Skeleton = function FormAttachCategorySkeleton() {
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
