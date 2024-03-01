import { Link, useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  Pagination,
  TableRow,
  TableSkeleton,
  EmptyPlaceholder,
} from "@/components";
import { Formatter } from "@/utils";
import { useGetSales } from "../queries";
import { saleActionRoutes } from "../utils";
import { productActionRoutes } from "../../product";

const Sale = () => {
  const [params] = useSearchParams();
  const {
    data: sales,
    isLoading,
    isError,
    error,
  } = useGetSales(params.toString());

  const isEmpty = sales?.rows.length === 0;

  return (
    <main className="container flex-1">
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
        <p className="text-muted-foreground">This is a list of sales.</p>
      </section>

      <section className="space-y-4">
        {/* <Search /> */}

        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : isEmpty ? (
          <TableEmpty />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.data.rows.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="max-w-sm">
                    <Link
                      to={productActionRoutes.details(sale.product.id)}
                      className="line-clamp-1 font-medium hover:underline"
                    >
                      {sale.product.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    {Formatter.money(sale.product.price)}
                  </TableCell>
                  <TableCell className="text-right">{sale.quantity}</TableCell>
                  <TableCell className="text-right">
                    {Formatter.money(sale.product.price * sale.quantity)}
                  </TableCell>
                  <TableCell className="text-center">
                    {Formatter.shortDate(sale.createdAt)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      to={saleActionRoutes.detail(sale.orderId)}
                      className="text-sm hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Pagination totalRows={sales.data?.count} />
      </section>
    </main>
  );
};

export default Sale;
