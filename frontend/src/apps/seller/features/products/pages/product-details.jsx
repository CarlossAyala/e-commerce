import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useGetCategories, useGetCategory } from "@/shared/features/category";
import { EmptyState, PageHeaderHeading, Pagination } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
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
  Filters,
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
  Spinner,
  Switch,
  SwitchSkeleton,
  Textarea,
  TextareaSkeleton,
} from "@/components";
import { cn } from "@/libs";
import { useDeleteProduct, useGetProduct, useUpdateProduct } from "../queries";
import { productDefault, productSchema } from "../schemas";
import { PRODUCT_CONDITIONS, productActionRoutes } from "../utils";

const filters = [
  {
    filter_type: "search",
  },
];

// TODO: add product photos
export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const product = useGetProduct(productId);
  useDocumentTitle(
    product.isLoading
      ? "Loading - Product"
      : product.isError
        ? `${product.error.message} - Product`
        : `${product.data.name} - Product`,
  );

  const [params] = useSearchParams();
  const categories = useGetCategories(params.toString());

  const { mutate, isLoading } = useUpdateProduct();
  const remove = useDeleteProduct();

  const form = useForm({
    resolver: yupResolver(productSchema),
    values: productDefault(product.data),
    mode: "onSubmit",
  });

  const currentCategoryId = product.data?.categoryId;
  const currentCategory = useGetCategory(currentCategoryId);

  const newCategoryId = form.watch("categoryId");
  const newCategory = useGetCategory(newCategoryId);

  const isNewCategory = newCategoryId !== currentCategoryId;

  const handleUpdate = (values) => {
    mutate(
      { productId, values },
      {
        onSuccess() {
          toast("Product updated successfully");
        },
      },
    );
  };
  const handleDelete = () => {
    remove.mutate(productId, {
      onSuccess() {
        toast("Product deleted successfully");
        navigate(productActionRoutes.root);
      },
    });
  };

  return (
    <main className="flex-1 space-y-4 pb-10">
      <section className="mt-4 flex justify-between px-6">
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
          <section className="space-y-6 px-6 pb-10">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <InputSkeleton />
            <TextareaSkeleton />
          </section>
          <Separator />
          <section className="space-y-6 px-6 py-10">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
          </section>
          <Separator />
          <section className="space-y-6 px-6 py-10">
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
          <section className="space-y-6 px-6 py-10">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>

            <Card className="p-4">
              <SwitchSkeleton />
            </Card>
          </section>
          <Separator />
          <section className="space-y-6 px-6 py-10">
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
              <section className="space-y-4 px-6 pb-10">
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

              <section className="space-y-4 px-6 py-10">
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

              <section className="space-y-4 px-6 py-10">
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
                        {currentCategory.isLoading ? (
                          <Card>
                            <CardHeader className="space-y-2">
                              <Skeleton className="h-4 w-1/3" />
                              <Skeleton className="h-4 w-full" />
                            </CardHeader>
                          </Card>
                        ) : currentCategory.isError ? (
                          <EmptyState
                            title="Error"
                            description={currentCategory.error.message}
                          />
                        ) : (
                          <Card>
                            <CardHeader>
                              <CardTitle className="truncate">
                                {currentCategory.data.name}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                {currentCategory.data.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        )}
                        <FormMessage />
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
                        ) : newCategory.isLoading ? (
                          <Card>
                            <CardHeader className="space-y-2">
                              <Skeleton className="h-4 w-1/3" />
                              <Skeleton className="h-4 w-full" />
                            </CardHeader>
                          </Card>
                        ) : newCategory.isError ? (
                          <EmptyState
                            title="Error"
                            description={newCategory.error.message}
                          />
                        ) : (
                          <div className="space-y-2">
                            <Card>
                              <CardHeader>
                                <CardTitle className="line-clamp-1">
                                  {newCategory.data.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                  {newCategory.data.description}
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

                        <Filters filters={filters} />

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
                        ) : !categories.data?.rows.length ? (
                          <EmptyState
                            title="No categories"
                            description="No categories found."
                          />
                        ) : (
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <Card className="divide-y overflow-hidden">
                                {categories.data.rows.map((category) => {
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
                        )}
                        <Pagination
                          count={categories.data?.count}
                          className="space-y-2"
                        />
                      </div>
                    </FormItem>
                  )}
                />
              </section>

              <Separator />

              <section className="space-y-4 px-6 py-10">
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
          <section className="space-y-4 px-6 py-10">
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
