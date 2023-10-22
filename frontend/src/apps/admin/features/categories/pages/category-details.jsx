import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCategory,
  useGetCategory,
  useUpdateCategory,
} from "../queries";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  Skeleton,
  Switch,
  Textarea,
  useToast,
} from "../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateCategoryDefault,
  updateCategoryInitial,
  updateCategorySchema,
} from "../schemas";
import { useState } from "react";
import { ArrowPathIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import { categoryActionRoutes, categoryTypes } from "../utils";
import clsx from "clsx";

export const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [modal, setModal] = useState(false);

  const {
    data: category,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetCategory(categoryId);
  const update = useUpdateCategory(categoryId);
  const remove = useDeleteCategory(categoryId);

  const form = useForm({
    resolver: yupResolver(updateCategorySchema),
    defaultValues: updateCategoryInitial,
    values: updateCategoryDefault(category),
    mode: "all",
  });

  const handleSave = (values) => {
    update.mutate(values, {
      onSuccess() {
        toast({
          description: "Category updated successfully",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Category could not be updated",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const handleRemove = () => {
    remove.mutate(category.id, {
      onSuccess() {
        toast({
          description: "Category removed successfully",
        });
        navigate(categoryActionRoutes.root, { replace: true });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Category could not be removed",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  return (
    <main className="space-y-4 p-4">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">
          Category Details
        </h2>
        <p className="text-sm leading-tight text-muted-foreground">
          Configure the category details.
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        {isLoading && (
          <>
            <Skeleton className="h-52 w-full" />
            <section className="max-w-2xl space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-8 max-w-sm" />
            </section>

            <section className="max-w-2xl space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-24 max-w-2xl" />
            </section>

            <section className="max-w-2xl space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-16" />
            </section>

            <section className="space-y-2">
              <Skeleton className="h-5 w-36" />

              <div className="grid grid-cols-2 grid-rows-3 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(10)].map((_, index) => (
                  <Skeleton key={index} className="h-5 w-full" />
                ))}
              </div>
            </section>

            <section className="flex flex-col-reverse gap-2 sm:flex-row">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </section>
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching category details
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isSuccess && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-4"
            >
              <div className="h-52 overflow-hidden rounded-md">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1679967488699-f159404b5c5c?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={`${category.name} front page`}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="max-w-sm">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="max-w-2xl">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="About this category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-1">
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm capitalize text-muted-foreground">
                  {category.type}
                </p>
              </div>

              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-md border p-4">
                    <div className="space-y-1">
                      <FormLabel className="mb-0 text-base">
                        Available
                      </FormLabel>
                      {category.type === categoryTypes.single && (
                        <FormDescription>
                          You cannot enable a category of type single.
                        </FormDescription>
                      )}
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={category.type === categoryTypes.single}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {category.type === categoryTypes.main && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Sub-Categories</p>
                  {category.children.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      {category.children.map((children) => (
                        <Link
                          key={children.id}
                          to={categoryActionRoutes.details(children.id)}
                          className="truncate text-xs leading-tight hover:text-blue-600"
                        >
                          {children.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No sub-categories
                    </p>
                  )}
                </div>
              )}
              {category.type === categoryTypes.sub && (
                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Main Category</p>
                    <Link
                      to={categoryActionRoutes.details(category.parent.id)}
                      className="truncate text-xs leading-tight hover:text-blue-600"
                    >
                      {category.parent.name}
                    </Link>
                  </div>

                  <p className="text-sm font-medium">Sub-categories</p>

                  {category.parent.children.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      {category.parent.children.map((children) => (
                        <Link
                          key={children.id}
                          to={categoryActionRoutes.details(children.id)}
                          className={clsx(
                            "truncate text-xs leading-tight hover:text-blue-600",
                            children.id === category.id &&
                              "uppercase text-blue-600",
                          )}
                        >
                          {children.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No sub-categories
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => setModal(true)}
                >
                  Remove
                </Button>
                <Button
                  type="submit"
                  disabled={update.isLoading || remove.isLoading}
                >
                  {update.isLoading && (
                    <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </form>

            <AlertDialog open={modal} onOpenChange={setModal}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="leading-tight">
                    Are you sure you want to remove this category?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={handleRemove}
                    disabled={remove.isLoading}
                  >
                    {remove.isLoading && (
                      <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Remove
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Form>
        )}
      </section>
    </main>
  );
};
