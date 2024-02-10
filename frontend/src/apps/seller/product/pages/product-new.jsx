import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  Label,
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
  toast,
} from "../../../../components";
import { Input } from "../../../../components/ui/input";
import { productInitial, productSchema } from "../schemas";
import { PRODUCT_CONDITIONS, productActionRoutes } from "../utils";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetCategories, useGetCategory } from "../../../common/category";
import { useDebounced } from "../../../../hooks";
import clsx from "clsx";
import { useCreateProduct } from "../queries";
import { MainContent } from "../../layouts";
import { clearEmptyValues } from "../../../../utils";

const ProductNew = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [categoryId, setCategoryId] = useState(null);

  const debounceParams = useDebounced(params.toString());
  const categories = useGetCategories(debounceParams);
  const category = useGetCategory(categoryId);
  const createProduct = useCreateProduct();

  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productInitial,
    mode: "all",
  });

  const onSubmit = (values) => {
    const cleanValues = clearEmptyValues(values);
    createProduct.mutate(cleanValues, {
      onSuccess(data) {
        navigate(productActionRoutes.details(data.id));

        toast({
          description: "Product created successfully",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong",
          description: error?.message ?? "Product could not be created.",
        });
      },
    });
  };

  const handleCancel = () => {
    navigate(productActionRoutes.root);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    params.delete("q");
    params.delete("page");
    if (value) params.set("q", value);
    setParams(params);
  };

  const isEmptyCategories = categories.isSuccess && categories.data?.rows === 0;
  const hasDataCategories =
    categories.isSuccess && categories.data?.rows.length > 0;

  return (
    <MainContent>
      <section className="pt-3">
        <h1 className="text-2xl font-bold tracking-tight">Product Details</h1>
        <p className="text-muted-foreground">
          View and edit the details of the product.
        </p>
      </section>

      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Information</h2>
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
                <h2 className="text-lg font-medium">Inventory</h2>
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
                      <Input
                        type="number"
                        placeholder="Stock alert"
                        {...field}
                      />
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
                          <SelectItem
                            key={condition}
                            value={condition}
                            className="capitalize"
                          >
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
                <h2 className="text-lg font-medium">Category</h2>
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
                        <h3 className="mb-2 text-sm font-medium">Selected</h3>
                        <Card className="max-w-sm">
                          {categoryId ? (
                            <>
                              {category.isLoading ? (
                                <CardHeader>
                                  <span className="text-muted-foreground">
                                    Loading category...
                                  </span>
                                </CardHeader>
                              ) : (
                                <>
                                  {category.isError && (
                                    <CardHeader className="space-y-2">
                                      <p className="text-muted-foreground">
                                        {category.error?.message ??
                                          "Something went wrong"}
                                      </p>
                                      <Button
                                        variant="outline"
                                        onClick={() => {
                                          setCategoryId(null);
                                          form.resetField("categoryId", "");
                                        }}
                                      >
                                        Reset new category
                                      </Button>
                                    </CardHeader>
                                  )}
                                  {category.isSuccess && (
                                    <CardHeader>
                                      <CardTitle>
                                        <Link
                                          target="_blank"
                                          to={`#${category.data.id}`}
                                        >
                                          {category.data.name}
                                        </Link>
                                      </CardTitle>
                                      <CardDescription className="line-clamp-2">
                                        {category.data.description}
                                      </CardDescription>
                                      <div className="flex justify-end pt-2">
                                        <Button
                                          type="button"
                                          variant="outline"
                                          onClick={() => {
                                            setCategoryId(null);
                                            form.resetField("categoryId", "");
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </CardHeader>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <CardHeader>
                              <span className="text-muted-foreground">
                                Select a category to start
                              </span>
                            </CardHeader>
                          )}
                        </Card>
                        <FormMessage />
                      </div>

                      <div>
                        <Label htmlFor="search">Search</Label>
                        <Input
                          name="search"
                          type="text"
                          placeholder="Search for a category"
                          value={search}
                          onChange={handleSearch}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <h3 className="mb-2 text-sm font-medium">Categories</h3>
                        <div className="space-y-4">
                          {categories.isLoading ? (
                            <p>Loading categories...</p>
                          ) : (
                            <>
                              {categories.isError && (
                                <div className="h-36 w-full rounded-lg border border-dashed">
                                  <div className="flex h-full flex-col items-center justify-center">
                                    <p className="text-muted-foreground">
                                      {categories.error?.message ??
                                        "Something went wrong"}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {isEmptyCategories && (
                                <div className="h-36 w-full rounded-lg border border-dashed">
                                  <div className="flex h-full flex-col items-center justify-center">
                                    <p className="text-muted-foreground">
                                      No results found.
                                    </p>
                                  </div>
                                </div>
                              )}
                              {hasDataCategories && (
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={(value) => {
                                      setCategoryId(value);
                                      field.onChange(value);
                                    }}
                                    className="mt-1 gap-0 divide-y overflow-hidden rounded-lg border"
                                  >
                                    {categories.data.rows.map((category) => {
                                      const isCurrentCategory =
                                        category.id === categoryId;

                                      return (
                                        <FormItem
                                          key={category.id}
                                          className={clsx(
                                            "flex items-center gap-x-4 p-4",
                                            isCurrentCategory && "bg-gray-100",
                                          )}
                                        >
                                          <FormControl>
                                            <RadioGroupItem
                                              value={category.id}
                                            />
                                          </FormControl>
                                          <div className="grow">
                                            <FormLabel className="mb-0 font-medium">
                                              {category.name}
                                            </FormLabel>
                                            <FormDescription className="line-clamp-2 text-sm">
                                              {category.description}
                                            </FormDescription>
                                            {isCurrentCategory && (
                                              <p className="text-sm font-medium italic">
                                                Current
                                              </p>
                                            )}
                                          </div>
                                        </FormItem>
                                      );
                                    })}
                                  </RadioGroup>
                                </FormControl>
                              )}
                            </>
                          )}
                          <Pagination totalRows={categories.data?.count} />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Settings</h2>
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
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </section>
    </MainContent>
  );
};

export default ProductNew;
