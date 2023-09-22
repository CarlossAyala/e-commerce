import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { productActionRoutes, useDeleteProduct, useGetProducts } from "..";
import {
  Badge,
  TablePagination,
  TableEmpty,
  TableError,
  TableSkeleton,
  useToast,
} from "../../../../components";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Formatter } from "../../../../utils/formatter";
import { Link, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { useDebounced } from "../../../../hooks";

const ProductList = () => {
  const { toast } = useToast();
  const [param, setParams] = useSearchParams();

  const [modal, setModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const [search, setSearch] = useState(param.get("q") || "");

  const debounceParams = useDebounced(param.toString(), 500);

  const products = useGetProducts(debounceParams);
  const remove = useDeleteProduct();

  const isEmpty = products.data?.rows.length === 0;
  const hasData = products.data?.rows.length > 0;

  const handleDelete = (id) => {
    remove.mutate(id, {
      onSuccess: () => {
        toast({
          description: "Product deleted successfully",
        });

        setModal(false);
        setModalProduct(null);
        remove.reset();
      },
      onError: (error) => {
        const description = error?.message ?? "Something went wrong";
        toast({
          variant: "destructive",
          title: "Error deleting product",
          description,
        });
      },
    });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    param.delete("q");
    param.delete("page");
    if (value) param.set("q", value);
    setParams(param);
  };

  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto">
      <section className="mt-3 px-4">
        <h1 className="text-2xl font-bold tracking-tight">Product List</h1>
        <p className="text-muted-foreground">
          Here are all the products in your store.
        </p>
      </section>

      <section className="space-y-3 px-4">
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="max-w-md"
        />

        {products.isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            {products.isError && <TableError />}
            {isEmpty && <TableEmpty />}
            {hasData && (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="uppercase">Product</TableHead>
                      <TableHead className="uppercase">Stock</TableHead>
                      <TableHead className="uppercase">Stock Alert</TableHead>
                      <TableHead className="uppercase">Sold</TableHead>
                      <TableHead className="text-right uppercase">
                        Price
                      </TableHead>
                      <TableHead className="text-center uppercase">
                        Created At
                      </TableHead>
                      <TableHead className="text-center uppercase">
                        Available
                      </TableHead>
                      <TableHead className="text-end uppercase">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.data.rows.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="max-w-sm truncate whitespace-nowrap font-medium">
                          <Link
                            to={productActionRoutes.details(product.id)}
                            className="hover:underline"
                          >
                            {product.name}
                          </Link>
                        </TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.stockAlert}</TableCell>
                        <TableCell>{product.sold}</TableCell>
                        <TableCell className="text-right">
                          {Formatter.money(product.price)}
                        </TableCell>
                        <TableCell className="text-center">
                          {Formatter.shortDate(product.createdAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">
                            {product.available ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div className="text-end">
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <EllipsisHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link
                                  to={productActionRoutes.details(product.id)}
                                >
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={productActionRoutes.edit(product.id)}>
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onSelect={() => {
                                  setModal(true);
                                  setModalProduct(product);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            <Dialog open={modal} onOpenChange={setModal}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-left">
                    Delete Product
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    This action cannot be undone. Are you sure you want to
                    permanently delete this file from our servers?
                  </DialogDescription>
                </DialogHeader>
                <dl className="space-y-2 rounded border border-dashed p-2">
                  <div>
                    <dt className="text-sm font-medium leading-tight text-gray-900">
                      ID
                    </dt>
                    <dd className="text- text-sm leading-tight">
                      {modalProduct?.id}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium leading-tight text-gray-900">
                      Name
                    </dt>
                    <dd className="text- text-sm leading-tight">
                      {modalProduct?.name}
                    </dd>
                  </div>
                </dl>
                <DialogFooter className="gap-2">
                  <Button
                    type="button"
                    className="grow"
                    variant="outline"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleDelete(modalProduct?.id)}
                    type="button"
                    className="flex grow items-center gap-x-2"
                    variant="destructive"
                    disabled={remove.isLoading || remove.isSuccess}
                  >
                    {remove.isLoading ? (
                      <span>Deleting...</span>
                    ) : (
                      <>
                        {remove.isError && <span>Error deleting</span>}
                        {remove.isIdle && <span>Delete</span>}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        <TablePagination totalRows={products.data?.count} />
      </section>
    </main>
  );
};

export default ProductList;
