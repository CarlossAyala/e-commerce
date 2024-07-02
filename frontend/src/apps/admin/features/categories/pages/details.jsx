import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  Spinner,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { validFileSize, validFileType } from "@/shared/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputSkeleton,
  Separator,
  Skeleton,
  Textarea,
  TextareaSkeleton,
} from "@/shared/components";
import {
  updateCategoryDefault,
  updateCategoryInitial,
  updateCategorySchema,
} from "../schemas";
import { categoryActionRoutes } from "../utils";
import {
  useDeleteCategory,
  useGetCategory,
  useUpdateCategory,
} from "../queries";

export const Details = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [deleteDialog, setDeleteDialog] = useState(false);

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
    mode: "onSubmit",
  });

  const handleUpdate = (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "currentGallery") {
        for (const file of values[key]) {
          formData.append("currentGallery[]", file.id);
        }
      } else if (key === "nextGallery") {
        for (const file of values[key]) {
          formData.append("nextGallery", file);
        }
      } else {
        formData.append(key, values[key]);
      }
    }

    update.mutate(formData, {
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

  const handleImageChange = (e) => {
    const current = form.getValues("currentGallery");
    const prev = form.getValues("nextGallery");
    const { files } = e.target;
    const validFiles = [...prev, ...files].filter(
      (file) => validFileType(file) && validFileSize(file),
    );
    const nextFiles = validFiles.slice(0, 10 - current.length);
    form.setValue("nextGallery", nextFiles);
  };
  const handleRemoveImage = (item, index) => {
    const current = form.getValues("currentGallery");
    const next = form.getValues("nextGallery");

    if (item instanceof File) {
      const newNext = next.filter((_, i) => i + current.length !== index);
      form.setValue("nextGallery", newNext);
    } else {
      const newCurrent = current.filter((file) => file.id !== item.id);
      form.setValue("currentGallery", newCurrent);
    }
  };

  const currentGallery = form.watch("currentGallery");
  const nextGallery = form.watch("nextGallery");
  const gallery = [...currentGallery, ...nextGallery];

  return (
    <main className="flex-1 pb-10">
      <PageHeader className="px-6">
        <PageHeaderHeading>Category Details</PageHeaderHeading>
      </PageHeader>

      {isLoading ? (
        <section>
          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <InputSkeleton />
            <TextareaSkeleton />

            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {new Array(12).fill(0).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <Skeleton className="aspect-h-9 aspect-w-16 sm:aspect-h-6 lg:aspect-h-4" />
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              <Skeleton className="aspect-h-9 aspect-w-16" />
            </div>
          </section>

          <Separator />

          <section className="flex gap-2 px-4 py-6 tablet:px-6">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </section>
        </section>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <section className="space-y-4 px-4 py-6 tablet:px-6">
                <div>
                  <h3 className="text-lg font-medium">Information</h3>
                  <p className="text-sm text-muted-foreground">
                    About this category.
                  </p>
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
                        <Textarea
                          placeholder="About this category"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!category.parentId && (
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">Sub-categories</p>

                    {category.children.length ? (
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-3 lg:grid-cols-4">
                        {category.children.map((children) => (
                          <li key={children.id}>
                            <Link
                              to={categoryActionRoutes.details(children.id)}
                              className="hover:text-blue-600"
                            >
                              {children.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>
                        <p className="text-muted-foreground">
                          No sub-categories
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>

              <Separator />

              <section className="space-y-4 px-4 py-6 tablet:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Gallery</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload up to 10 images for the category banner.
                    </p>
                  </div>

                  <div>
                    <p className="text-lg text-muted-foreground">
                      {gallery.length} / 10
                    </p>
                  </div>
                </div>

                {gallery.length ? (
                  <Carousel>
                    <CarouselContent>
                      {gallery.map((item, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-md border sm:aspect-h-6 lg:aspect-h-4">
                            <img
                              alt="Category Profile"
                              src={
                                item instanceof File
                                  ? URL.createObjectURL(item)
                                  : item.url
                              }
                              className="size-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                ) : (
                  <div className="flex h-80 w-full flex-col items-center justify-center rounded-md border border-dashed">
                    <PhotoIcon className="size-32 stroke-1 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Preview will be shown here.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-5 gap-4">
                  {gallery.map((item, index) => (
                    <div
                      key={index}
                      className="group aspect-h-9 aspect-w-16 relative overflow-hidden rounded-md border"
                    >
                      <img
                        alt="Category Profile"
                        src={
                          item instanceof File
                            ? URL.createObjectURL(item)
                            : item.url
                        }
                        className="size-full object-cover"
                      />
                      <button
                        className="absolute inset-0 hidden items-center justify-center bg-black group-hover:flex group-hover:bg-black/50"
                        onClick={() => handleRemoveImage(item, index)}
                        type="button"
                      >
                        <XMarkIcon className="size-10 text-white" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                  ))}
                  {gallery.length < 10 && (
                    <FormField
                      control={form.control}
                      name="nextGallery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="aspect-h-9 aspect-w-16 relative m-0 rounded-md border border-dashed">
                            <ArrowUpTrayIcon className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              multiple
                              className="hidden"
                              {...field}
                              onChange={handleImageChange}
                              value=""
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </section>

              <Separator />

              <section className="flex gap-2 px-4 py-6 tablet:px-6">
                <Button type="submit" disabled={update.isLoading}>
                  {update.isLoading && <Spinner className="mr-2 size-4" />}
                  Update
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setDeleteDialog(true)}
                >
                  Delete
                </Button>
              </section>
            </form>
          </Form>

          <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This category will no longer be
                  accessible by you or others.
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
        </>
      )}
    </main>
  );
};
