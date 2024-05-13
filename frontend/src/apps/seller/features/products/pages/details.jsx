import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useGetCategories } from "@/shared/features/categories";
import {
  EmptyState,
  PageHeaderHeading,
  Spinner,
  LocalPagination,
} from "@/shared/components";
import { useDocumentTitle, useLocalSearchParams } from "@/shared/hooks";
import { paginateArray, validFileSize, validFileType } from "@/shared/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputSkeleton,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Switch,
  SwitchSkeleton,
  Textarea,
  TextareaSkeleton,
} from "@/components";
import { cn } from "@/libs";
import { useDeleteProduct, useGetProduct, useUpdateProduct } from "../queries";
import { productDefault, updateSchema } from "../schemas";
import { PRODUCT_CONDITIONS, productActionRoutes } from "../utils";

export const Details = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const product = useGetProduct(productId);
  useDocumentTitle(product.data?.name);

  const categories = useGetCategories();

  const { mutate, isLoading } = useUpdateProduct(productId);
  const remove = useDeleteProduct();

  const form = useForm({
    resolver: yupResolver(updateSchema),
    values: productDefault(product.data),
    mode: "onSubmit",
  });

  const { params, setParams } = useLocalSearchParams({
    page: 1,
    limit: 10,
    q: "",
  });
  const search = params.get("q");
  const filtered = categories.data?.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );
  const _categories = paginateArray({
    data: filtered,
    limit: params.get("limit"),
    page: params.get("page"),
  });

  const handleSearch = (e) => {
    const newParams = new URLSearchParams(params);
    newParams.set("q", e.target.value);
    newParams.set("page", 1);
    setParams(newParams);
  };

  const currentCategoryId = product.data?.categoryId;
  const currentCategory = categories.data?.find(
    (c) => c.id === currentCategoryId,
  );

  const newCategoryId = form.watch("categoryId");
  const newCategory = categories.data?.find((c) => c.id === newCategoryId);

  const isNewCategory = newCategoryId !== currentCategoryId;

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

    mutate(formData, {
      onSuccess() {
        toast("Product updated successfully");
      },
    });
  };

  const handleDelete = () => {
    remove.mutate(productId, {
      onSuccess() {
        toast("Product deleted successfully");
        navigate(productActionRoutes.root);
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
      const nextCurrent = current.filter((file) => file.id !== item.id);
      form.setValue("currentGallery", nextCurrent);
    }
  };

  const currentGallery = form.watch("currentGallery");
  const nextGallery = form.watch("nextGallery");
  const gallery = [...currentGallery, ...nextGallery];

  return (
    <main className="flex-1 space-y-4 pb-10">
      <section className="mt-4 flex justify-between px-4 tablet:px-6">
        <PageHeaderHeading>Product Details</PageHeaderHeading>
        <Button
          form="product-update"
          type="submit"
          disabled={!product.data || isLoading}
        >
          {isLoading && <Spinner className="mr-2 size-4" />}
          Update
        </Button>
      </section>

      {product.isLoading ? (
        <>
          <section className="space-y-4 px-4 pb-6 tablet:px-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <InputSkeleton />
            <TextareaSkeleton />
          </section>
          <Separator />
          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
          </section>
          <Separator />
          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>

            {new Array(2).fill(null).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Card className="space-y-2 p-4">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </Card>
              </div>
            ))}

            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-7 w-full sm:max-w-sm" />

              <Card>
                <ul className="divide-y">
                  {new Array(3).fill(null).map((_, index) => (
                    <li key={index} className="flex gap-4 p-4">
                      <Skeleton className="size-4 shrink-0 rounded-full" />
                      <div className="grow space-y-2">
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>
          <Separator />
          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="aspect-h-1 aspect-w-1" />
              <div>
                <div className="grid grid-cols-3 gap-4 tablet:grid-cols-4">
                  <Skeleton className="aspect-h-1 aspect-w-1" />
                </div>
              </div>
            </div>
          </section>
          <Separator />
          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>

            <Card className="p-4">
              <SwitchSkeleton />
            </Card>
          </section>
          <Separator />
          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-9 w-20" />
          </section>
        </>
      ) : product.isError ? (
        <section className="px-6">
          <EmptyState title="Error" description={product.error.message} />
        </section>
      ) : (
        <>
          <Form {...form}>
            <form
              id="product-update"
              onSubmit={form.handleSubmit(handleUpdate)}
            >
              <section className="space-y-4 px-4 pb-6 tablet:px-6">
                <div>
                  <h3 className="text-lg font-medium">Information</h3>
                  <p className="text-sm text-muted-foreground">
                    The information about the product.
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
                          placeholder="Describe your product here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <Separator />

              <section className="space-y-4 px-4 py-6 tablet:px-6">
                <div>
                  <h3 className="text-lg font-medium">Inventory</h3>
                  <p className="text-sm text-muted-foreground">
                    Control the inventory of the product.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Stock" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRODUCT_CONDITIONS.map((condition) => (
                            <SelectItem
                              key={condition.label}
                              value={condition.value}
                            >
                              {condition.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <Separator />

              <section className="space-y-4 px-4 py-6 tablet:px-6">
                <div>
                  <h3 className="text-lg font-medium">Category</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the category of the product.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Current</h4>

                        {!currentCategory ? (
                          <EmptyState
                            title="Error"
                            description="No category found"
                          />
                        ) : (
                          <Card>
                            <CardHeader>
                              <CardTitle className="line-clamp-1">
                                {currentCategory.name}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                {currentCategory.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">New</h4>

                        {!newCategoryId || !isNewCategory ? (
                          <Card>
                            <CardHeader>
                              <CardDescription>
                                Select a new category to change the current one.
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ) : (
                          <div className="space-y-2">
                            <Card>
                              <CardHeader>
                                <CardTitle className="line-clamp-1">
                                  {newCategory.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                  {newCategory.description}
                                </CardDescription>
                              </CardHeader>
                            </Card>

                            <Button
                              variant="outline"
                              onClick={() => {
                                form.setValue("categoryId", currentCategoryId);
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Categories</h4>

                        <Input
                          className="w-full md:max-w-md"
                          value={search}
                          onChange={handleSearch}
                          placeholder="Search categories"
                        />

                        {categories.isLoading ? (
                          <Card className="divide-y overflow-hidden">
                            {new Array(5).fill("").map((_, index) => (
                              <div key={index} className="flex gap-2 p-4">
                                <Skeleton className="size-4 shrink-0" />
                                <div className="flex grow flex-col gap-2">
                                  <Skeleton className="h-4 w-1/3" />
                                  <Skeleton className="h-4 w-full" />
                                </div>
                              </div>
                            ))}
                          </Card>
                        ) : categories.isError ? (
                          <EmptyState
                            title="Error"
                            description={categories.error.message}
                          />
                        ) : !categories.data.length ? (
                          <EmptyState
                            title="No categories"
                            description="No categories found"
                          />
                        ) : !_categories.length ? (
                          <EmptyState
                            title="No categories"
                            description={`No categories found for "${search}"`}
                          />
                        ) : (
                          <>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <Card className="divide-y overflow-hidden">
                                  {_categories.map((category) => {
                                    const isCurrentCategory =
                                      category.id === currentCategoryId;
                                    const _isNewCategory =
                                      isNewCategory &&
                                      category.id === newCategoryId;

                                    return (
                                      <FormItem
                                        key={category.id}
                                        className={cn(
                                          "flex gap-x-4 p-4",
                                          _isNewCategory && "bg-gray-100",
                                        )}
                                      >
                                        <FormControl>
                                          <RadioGroupItem value={category.id} />
                                        </FormControl>
                                        <div className="grow">
                                          <FormLabel className="mb-0 font-medium">
                                            {category.name}
                                          </FormLabel>
                                          <FormDescription className="line-clamp-2 text-sm">
                                            {category.description}
                                          </FormDescription>
                                          {isCurrentCategory && (
                                            <Badge variant="outline">
                                              Current
                                            </Badge>
                                          )}
                                          {_isNewCategory && <Badge>New</Badge>}
                                        </div>
                                      </FormItem>
                                    );
                                  })}
                                </Card>
                              </RadioGroup>
                            </FormControl>

                            <LocalPagination
                              count={filtered.length}
                              params={params}
                              setParams={setParams}
                            />
                          </>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </section>

              <Separator />

              <section className="px-6 py-10">
                <div className="mb-4 flex justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Gallery</h3>
                    <p className="text-sm text-muted-foreground">
                      You can add up to 10 images to the gallery. The first one
                      will be used as profile.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-lg text-muted-foreground">
                      {gallery.length} / 10
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    {gallery.length ? (
                      <Carousel>
                        <CarouselContent>
                          {gallery.map((item, index) => (
                            <CarouselItem key={index}>
                              <div
                                key={index}
                                className="group aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-md border"
                              >
                                <img
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
                      <div className="aspect-h-1 aspect-w-1 relative w-full rounded-md border border-dashed">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <PhotoIcon className="size-32 stroke-1 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Preview will be shown here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="grid grid-cols-3 gap-4 tablet:grid-cols-4">
                      {gallery.map((item, index) => (
                        <div
                          key={index}
                          className="group aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-md border"
                        >
                          <img
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
                        <div className="aspect-h-1 aspect-w-1 relative w-full rounded-md border border-dashed">
                          <label
                            htmlFor="nextGallery"
                            className="absolute inset-0 flex flex-col items-center justify-center"
                          >
                            <ArrowUpTrayIcon className="size-6 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </label>
                          <input
                            id="nextGallery"
                            name="nextGallery"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleImageChange}
                            value=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              <section className="space-y-4 px-4 py-6 tablet:px-6">
                <div>
                  <h3 className="text-lg font-medium">Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure the settings of the product.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <FormLabel className="mb-0">Available</FormLabel>
                        <FormDescription>
                          This will prevent customers from buying it.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </section>
            </form>
          </Form>
          <Separator />
          <section className="space-y-4 px-4 py-6 tablet:px-6">
            <div>
              <h3 className="text-lg font-medium">Delete Product</h3>
              <p className="text-sm text-muted-foreground">
                Delete the product and all its associated data. This action
                cannot be undone. This will no longer be accessible by you or
                others.
              </p>
            </div>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will no longer be
                    accessible by you or others.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={remove.isLoading}
                  >
                    {remove.isLoading && <Spinner className="mr-2 size-4" />}
                    Yes, Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </>
      )}
    </main>
  );
};
