import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { cn } from "@/libs/utils";
import {
  Button,
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
  Switch,
  Pagination,
  Textarea,
  Input,
  Filters,
  EmptyPlaceholder,
  Card,
  Skeleton,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components";
import { productInitial, productSchema } from "../schemas";
import { PRODUCT_CONDITIONS, productActionRoutes } from "../utils";
import { useCreateProduct } from "../queries";
import { clearEmptyValues } from "@/utils";
import { useGetCategories, useGetCategory } from "@/shared/features/category";

const filters = [
  {
    filter_type: "search",
  },
];

// TODO: add product photos
export const ProductNew = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const categories = useGetCategories(params.toString());

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productInitial,
    mode: "all",
  });
  const categoryId = form.watch("categoryId");

  const category = useGetCategory(categoryId);
  const create = useCreateProduct();

  const handleCreate = (values) => {
    const cleanValues = clearEmptyValues(values);

    create.mutate(cleanValues, {
      onSuccess(data) {
        toast("Product created successfully");
        navigate(productActionRoutes.details(data.id));
      },
    });
  };

  const handleCancel = () => {
    navigate(productActionRoutes.root);
  };

  const isEmpty = categories.data?.rows.length === 0;

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Product New
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-10">
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
                    You will be notified when the stock is below this value.
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

          <div className="space-y-4">
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
                      <h3 className="mb-2 text-sm font-medium">Current</h3>
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
                        <EmptyPlaceholder
                          title="Error"
                          description={category.error.message}
                        />
                      ) : (
                        <Card>
                          <CardHeader>
                            <CardTitle className="truncate">
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
                                    <FormLabel className="mb-0 truncate font-medium">
                                      {category.name}
                                    </FormLabel>
                                    <FormDescription className="line-clamp-2 text-sm font-normal">
                                      {category.description}
                                    </FormDescription>
                                  </FormLabel>
                                </FormItem>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      )}
                      <Pagination totalRows={categories.data?.count} />
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
          </div>

          <div className="flex items-center gap-x-4">
            <Button type="submit">Create</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};
