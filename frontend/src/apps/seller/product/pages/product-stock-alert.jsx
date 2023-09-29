import { Link, useSearchParams } from "react-router-dom";
import { useGetProduct, useGetStockAlert, useUpdateProduct } from "../queries";
import { useDebounced } from "../../../../hooks";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Mandatory,
  Search,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
  TableSkeleton,
  useToast,
} from "../../../../components";
import { productActionRoutes } from "../utils";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productDefault, productInitial, productSchema } from "../schemas";
import { Formatter } from "../../../../utils/formatter";
import { MainContent } from "../../layouts";

const ProductStockAlert = () => {
  const { toast } = useToast();
  const [params] = useSearchParams();
  const [sheet, setSheet] = useState(false);
  const [productId, setProductId] = useState(null);
  const debounceParams = useDebounced(params.toString());

  const product = useGetProduct(productId);
  const products = useGetStockAlert(debounceParams);
  const updateProduct = useUpdateProduct();

  const form = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productInitial,
    values: productDefault(product.data),
    mode: "all",
  });

  const onSubmit = (values) => {
    updateProduct.mutate([productId, values], {
      onSuccess() {
        setSheet(false);
        setProductId(null);
        toast({
          description: "Product updated successfully",
        });
        setTimeout(updateProduct.reset, 1300);
      },
      onError(error) {
        toast({
          title: "Product could not be updated",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const isEmpty = products.isSuccess && products.data?.rows.length === 0;
  const hasContent = products.isSuccess && products.data?.rows.length > 0;

  return (
    <MainContent>
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Stock Alert</h1>
        <p className="text-muted-foreground">
          This products are running low on stock.
        </p>
      </section>

      <section className="space-y-4">
        <Search />

        {products.isLoading && <TableSkeleton />}
        {isEmpty && <TableEmpty />}
        {hasContent && (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Stock Alert</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.data.rows.map((_product) => (
                  <TableRow key={_product.id}>
                    <TableCell>
                      <Link
                        className="line-clamp-1"
                        to={productActionRoutes.details(_product.id)}
                      >
                        {_product.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {_product.stock}
                    </TableCell>
                    <TableCell className="text-center">
                      {_product.stockAlert}
                    </TableCell>
                    <TableCell className="text-right">
                      {Formatter.money(_product.price)}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                          >
                            <EllipsisHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={productActionRoutes.details(_product.id)}>
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              setSheet(true);
                              setProductId(_product.id);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Sheet open={sheet} onOpenChange={setSheet}>
              <SheetContent className="space-y-4">
                <SheetHeader>
                  <SheetTitle>Edit product</SheetTitle>
                  <SheetDescription>
                    Make changes to your product stock and stock alert.
                  </SheetDescription>
                </SheetHeader>
                {product.isLoading && (
                  <div>
                    <h3 className="mb-1 text-sm font-medium">Product</h3>
                    <Card>
                      <CardHeader>Loading...</CardHeader>
                    </Card>
                  </div>
                )}
                {product.isError && (
                  <div>
                    <h3 className="mb-1 text-sm font-medium">Product</h3>
                    <Card>
                      <CardHeader>Error</CardHeader>
                      <CardDescription>
                        {product.error?.message ??
                          "Uh oh! Something went wrong."}
                      </CardDescription>
                    </Card>
                  </div>
                )}
                {product.isSuccess && (
                  <>
                    <div>
                      <h3 className="mb-1 text-sm font-medium">Product</h3>
                      <Card>
                        <CardHeader>
                          <CardTitle className="leading-snug">
                            <Link
                              className="line-clamp-1 hover:underline"
                              to={productActionRoutes.details(product.data.id)}
                            >
                              {product.data.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {product.data.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Stock"
                                  {...field}
                                />
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
                                You will be notified when the stock is below
                                this value.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                              setSheet(false);
                              setProductId(null);
                            }}
                          >
                            Cancel
                          </Button>
                          <SheetClose asChild>
                            <Button type="submit">Save</Button>
                          </SheetClose>
                        </div>
                      </form>
                    </Form>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        )}

        <TablePagination totalRows={products.data?.count} />
      </section>
    </MainContent>
  );
};

export default ProductStockAlert;
