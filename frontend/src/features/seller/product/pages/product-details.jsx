import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
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
  TablePagination,
  Textarea,
} from "../../../../components";
import { Input } from "../../../../components/ui/input";
import { productInitial, productSchema } from "../schemas";
import { PRODUCT_CONDITIONS } from "../utils";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetCategories } from "../../../common/category";
import { useDebounced } from "../../../../hooks";

const ProductDetails = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const debounceParams = useDebounced(params.toString());
  const categories = useGetCategories(debounceParams);

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productInitial,
    mode: "onChange",
  });
  const onSubmit = (values) => {
    console.log("Values", values);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    params.delete("q");
    if (value) params.set("q", value);
    setParams(params);
  };
  console.log("Categories", categories);

  const categoriesHasData =
    categories.isSuccess && categories.data?.rows.length > 0;

  return (
    <main className="flex w-full flex-col space-y-6 overflow-auto px-4 pb-20">
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
                <h4 className="mb-2 text-sm font-medium">Categories</h4>
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <div className="space-y-4">
                      {categories.isLoading ? (
                        <p>Loading categories...</p>
                      ) : (
                        <>
                          {categoriesHasData && (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="gap-0 divide-y rounded-lg border"
                                >
                                  {categories.data.rows.map((category) => (
                                    <FormItem
                                      key={category.id}
                                      className="flex items-center gap-x-4 p-4"
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
                                      </div>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        </>
                      )}

                      <TablePagination totalRows={categories.data?.count} />
                    </div>
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
          </form>
        </Form>
      </section>
    </main>
  );
};

export default ProductDetails;
