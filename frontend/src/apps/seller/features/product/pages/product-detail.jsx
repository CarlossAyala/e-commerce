import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Mandatory,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  InputSkeleton,
  SkeletonStakedList,
  SkeletonTitle,
  Switch,
  Textarea,
  Input,
  Filters,
  EmptyPlaceholder,
  Skeleton,
  Badge,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components";
import { Pagination } from "@/shared/components";
import { useGetCategories, useGetCategory } from "@/shared/features/category";
import { clearEmptyValues } from "@/utils";
import { cn } from "@/libs";
import { productDefault, productInitial, productSchema } from "../schemas";
import { useDeleteProduct, useGetProduct, useUpdateProduct } from "../queries";
import { PRODUCT_CONDITIONS, productActionRoutes } from "../utils";

const filters = [
  {
    filter_type: "search",
  },
];

// TODO: add product photos
export const ProductDetail = () => {
  const [dialog, setDialog] = useState(false);
  const [params] = useSearchParams();
  const { productId } = useParams();

  const categories = useGetCategories(params.toString());
  const product = useGetProduct(productId);

  const currentCategoryId = product.data?.categoryId;
  const currentCategory = useGetCategory(currentCategoryId);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productInitial,
    values: productDefault(product.data),
    mode: "all",
  });
  const newCategoryId = form.watch("categoryId");

  const newCategory = useGetCategory(newCategoryId);

  const handleUpdate = (values) => {
    const cleanValues = clearEmptyValues(values);

    updateProduct.mutate(
      { productId, values: cleanValues },
      {
        onSuccess() {
          toast("Product updated successfully");
          updateProduct.reset();
        },
      },
    );
  };

  const handleDelete = () => {
    deleteProduct.mutate(productId, {
      onSuccess() {
        toast("Product deleted successfully");
        navigate(productActionRoutes.root);
      },
    });
  };

  const handleCancel = () => {
    navigate(productActionRoutes.root);
  };

  const isEmpty = categories.data?.rows.length === 0;
  const isNewCategory = newCategoryId !== currentCategoryId;

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Product Details
      </h2>

      <section className="space-y-10">
        {product.isLoading ? (
          <>
            <div className="space-y-4">
              <SkeletonTitle />
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>
            <div className="space-y-4">
              <SkeletonTitle />
              <SkeletonStakedList />
            </div>
          </>
        ) : product.isError ? (
          <EmptyPlaceholder title="Error" description={product.error.message} />
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className="space-y-10"
              >
                <div className="space-y-4">
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
                </div>

                <div className="space-y-4">
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
                    name="stockAlert"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Stock Alert
                          <Mandatory optional />
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Stock" {...field} />
                        </FormControl>
                        <FormDescription>
                          You will be notified when the stock is below this
                          value.
                        </FormDescription>
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
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PRODUCT_CONDITIONS.map((condition) => (
                              <SelectItem key={condition} value={condition}>
                                {condition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-medium">Category</h3>
                    <p className="text-sm text-muted-foreground">
                      Select the category of the product.
                    </p>
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <div>
                            <FormMessage />

                            <h3 className="mb-2 text-sm font-medium">
                              Current
                            </h3>
                            {currentCategory.isLoading ? (
                              <Card>
                                <CardHeader className="space-y-2">
                                  <Skeleton className="h-4 w-1/3" />
                                  <Skeleton className="h-4 w-full" />
                                </CardHeader>
                              </Card>
                            ) : currentCategory.isError ? (
                              <EmptyPlaceholder
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

                          <div>
                            <h3 className="mb-2 text-sm font-medium">New</h3>

                            {!isNewCategory ? (
                              <Card>
                                <CardHeader>
                                  <CardDescription>
                                    Select a new category to change the current
                                    one.
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
                              <EmptyPlaceholder
                                title="Error"
                                description={newCategory.error.message}
                              />
                            ) : (
                              <div className="space-y-2">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="truncate">
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
                                    form.setValue(
                                      "categoryId",
                                      currentCategoryId,
                                    );
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Categories</h3>

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
                              <EmptyPlaceholder
                                title="Error"
                                description={categories.error.message}
                              />
                            ) : isEmpty ? (
                              <EmptyPlaceholder
                                title="No categories"
                                description="No categories found."
                              />
                            ) : (
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="mt-1 gap-0 divide-y overflow-hidden rounded-lg border"
                                >
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
                                          "flex items-center gap-x-4 p-4",
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
                                </RadioGroup>
                              </FormControl>
                            )}
                            <Pagination count={categories.data?.count} />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure the product.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div>
                          <FormLabel className="mb-0 text-base">
                            Available
                          </FormLabel>
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
                </div>

                <div className="flex items-center gap-x-4">
                  <Button
                    type="submit"
                    disabled={
                      deleteProduct.isLoading || updateProduct.isLoading
                    }
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setDialog(true)}
                    disabled={
                      deleteProduct.isLoading || updateProduct.isLoading
                    }
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={
                      deleteProduct.isLoading || updateProduct.isLoading
                    }
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>

            <AlertDialog open={dialog} onOpenChange={setDialog}>
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
                    disabled={deleteProduct.isLoading}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </section>
    </main>
  );
};
