import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { CategoryType } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@/components";
import {
  updateCategoryDefault,
  updateCategoryInitial,
  updateCategorySchema,
} from "../schemas";
import { categoryActionRoutes, CATEGORY_TYPES } from "../utils";
import {
  useDeleteCategory,
  useGetCategory,
  useUpdateCategory,
} from "../queries";

const { MAIN, SUB } = CATEGORY_TYPES;

// TODO: Add front page
export const Details = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useGetCategory(categoryId);
  useDocumentTitle(category?.name ?? "Category Details");

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
        toast("Category updated successfully");
      },
    });
  };

  const handleRemove = () => {
    remove.mutate(category.id, {
      onSuccess() {
        toast("Category removed successfully");
        navigate(categoryActionRoutes.root, { replace: true });
      },
    });
  };

  return (
    <main className="flex-1 space-y-6 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Category Details
      </h2>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-64 w-full" />
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
              <Skeleton className="h-4 w-36" />

              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {new Array(12).fill(0).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </section>

            <section className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </section>
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="space-y-4"
            >
              <div className="h-64 overflow-hidden rounded-md">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1679967488699-f159404b5c5c?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={category.name}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
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
                  <CategoryType type={category.type} />
                </p>
              </div>

              {category.type === MAIN && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Sub-categories</p>

                  {category.children.length > 0 ? (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {category.children.map((children) => (
                        <li key={children.id}>
                          <Link
                            to={categoryActionRoutes.details(children.id)}
                            className="truncate text-sm hover:text-blue-600"
                          >
                            {children.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No sub-categories
                    </p>
                  )}
                </div>
              )}
              {category.type === SUB && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Parent Category</p>

                  <Link
                    to={categoryActionRoutes.details(category.parent.id)}
                    className="truncate text-sm leading-tight hover:text-blue-600"
                  >
                    {category.parent.name}
                  </Link>
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={update.isLoading}>
                  {update.isLoading && <Spinner className="mr-2 size-4" />}
                  Save
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => setDeleteDialog(true)}
                >
                  Delete
                </Button>
              </div>
            </form>

            <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This category will no longer
                    be accessible by you or others.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={handleRemove}
                    disabled={remove.isLoading}
                  >
                    {remove.isLoading && <Spinner className="mr-2 size-4" />}
                    Delete
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
