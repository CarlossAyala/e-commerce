import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useGetCategories, useGetCategory } from "@/shared/features/categories";
import {
  EmptyState,
  PageHeaderHeading,
  Pagination,
  Spinner,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  Input,
  Filters,
  Card,
  Skeleton,
  CardHeader,
  CardTitle,
  CardDescription,
  Separator,
} from "@/components";
import { cn } from "@/libs";
import { clearEmptyValues } from "@/utils";
import { productInitial, productSchema } from "../schemas";
import { PRODUCT_CONDITIONS, productActionRoutes } from "../utils";
import { useCreateProduct } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

// TODO: add product photos
export const ProductNew = () => {
  useDocumentTitle("Create Product");
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const categories = useGetCategories(params.toString());

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productInitial,
    mode: "onSubmit",
  });
  const categoryId = form.watch("categoryId");

  const category = useGetCategory(categoryId);
  const { mutate, isLoading } = useCreateProduct();

  const handleCreate = (values) => {
    const cleanValues = clearEmptyValues(values);

    mutate(cleanValues, {
      onSuccess(product) {
        toast("Product created successfully");
        navigate(productActionRoutes.details(product.id));
      },
    });
  };

  const isEmpty = categories.data?.rows.length === 0;

  return (
    <main className="flex-1 space-y-4 pb-10">
      <section className="mt-4 flex justify-between px-6">
        <PageHeaderHeading>Product New</PageHeaderHeading>
        <Button form="product-new" type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 size-4" />}
          Create
        </Button>
      </section>

      <Form {...form}>
        <form id="product-new" onSubmit={form.handleSubmit(handleCreate)}>
          <section className="space-y-6 px-6 pb-10">
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

          <section className="space-y-6 px-6 py-10">
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
                  <Select onValueChange={field.onChange} value={field.value}>
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

          <section className="space-y-6 px-6 py-10">
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
                      <h4 className="mb-2 text-sm font-medium">Current</h4>

                      {!categoryId ? (
                        <Card>
                          <CardHeader>
                            <CardDescription>
                              No category selected.
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      ) : category.isLoading ? (
                        <Card>
                          <CardHeader className="space-y-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-full" />
                          </CardHeader>
                        </Card>
                      ) : category.isError ? (
                        <EmptyState
                          title="Error"
                          description={category.error.message}
                        />
                      ) : (
                        <Card>
                          <CardHeader>
                            <CardTitle className="line-clamp-1">
                              {category.data.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {category.data.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      )}
                      <FormMessage />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Categories</h4>

                      <Filters filters={filters} />

                      {categories.isLoading ? (
                        <Card className="divide-y">
                          {new Array(3).fill("").map((_, index) => (
                            <div key={index} className="flex gap-4 p-4">
                              <Skeleton className="size-4 shrink-0 rounded-full" />
                              <div className="grow space-y-2">
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
                      ) : isEmpty ? (
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
                                  field.value === category.id;

                                return (
                                  <FormItem
                                    key={category.id}
                                    className={cn(
                                      "flex items-start gap-4 p-4",
                                      isCurrentCategory && "bg-gray-100",
                                    )}
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={category.id} />
                                    </FormControl>
                                    <FormLabel className="m-0 grow">
                                      <FormLabel className="mb-0 line-clamp-1 font-medium">
                                        {category.name}
                                      </FormLabel>
                                      <FormDescription className="line-clamp-2 text-sm font-normal">
                                        {category.description}
                                      </FormDescription>
                                    </FormLabel>
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
            </div>
          </section>

          <Separator />

          <section className="space-y-6 px-6 py-10">
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
    </main>
  );
};
