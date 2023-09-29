import { Link, useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../../hooks";
import { useGetSales } from "../queries";
import {
  Search,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
  TableSkeleton,
} from "../../../../components";
import { Formatter } from "../../../../utils/formatter";
import { productActionRoutes } from "../../product/utils";
import { saleActionRoutes } from "../utils";
import { MainContent } from "../../layouts";

const Sale = () => {
  const [params] = useSearchParams();

  const debounceParams = useDebounced(params.toString());
  const sales = useGetSales(debounceParams);

  const isEmpty = sales.isSuccess && sales.data?.rows.length === 0;
  const hasContent = sales.isSuccess && sales.data?.rows.length > 0;

  return (
    <MainContent>
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
        <p className="text-muted-foreground">This is a list of sales.</p>
      </section>

      <section className="space-y-4">
        <Search />

        {sales.isLoading && <TableSkeleton />}
        {isEmpty && <TableEmpty />}
        {hasContent && (
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

        <TablePagination totalRows={sales.data?.count} />
      </section>
    </MainContent>
  );
};

export default Sale;
