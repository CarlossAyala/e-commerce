import { Link, useSearchParams } from "react-router-dom";
import {
  DataTableSkeleton,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  Button,
} from "@carbon/react";
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";
import { useGetSales } from "../features/sale";
import { ddMMYYFormatter } from "../utils/date";
import { priceFormatter } from "../utils/formatter";

const headers = [
  {
    key: "product",
    header: "PRODUCT",
  },
  {
    key: "qty",
    header: "QTY",
  },
  {
    key: "price",
    header: "PRICE",
  },
  {
    key: "amount",
    header: "AMOUNT",
  },
  {
    key: "date",
    header: "DATE",
  },
  {
    key: "actions",
    header: "",
  },
];

const SaleList = () => {
  const [params, setParams] = useSearchParams();
  const sales = useGetSales();
  console.log("Sales", sales);

  const rows = sales.data?.rows.map(
    ({ id, orderId, product, quantity, price, createdAt }) => ({
      id,
      product: (
        <Link to={`/product/${product.id}/view`}>
          <div className="flex items-center gap-x-1">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_904598-MLU69493154879_052023-O.webp"
                alt={product.name}
              />
            </div>
            <div className="grow">
              <p className="line-clamp-1 text-sm leading-tight text-blue-600">
                {product.name}
              </p>
            </div>
          </div>
        </Link>
      ),
      qty: quantity,
      price: priceFormatter(price),
      amount: priceFormatter(quantity * price),
      date: ddMMYYFormatter(createdAt),
      actions: (
        <Link to={`/sale/${orderId}/view#${id}`} target="_blank">
          <p className="text-sm leading-tight text-blue-600">View</p>
        </Link>
      ),
    })
  );

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 pt-2">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Sale list
        </h2>
        <p className="text-sm text-gray-600">
          List of sales and their details.
        </p>
      </section>

      <section className="mt-4 px-4">
        {sales.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {sales.isSuccess && sales.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Tabla sales"
                  description="List of sales and their details"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No sales found
                  </p>
                  <p className="mb-4 mt-1 text-sm leading-tight text-gray-600">
                    It seems that no one has bought anything.
                  </p>

                  <Button
                    disabled={sales.isLoading}
                    onClick={() => sales.refetch()}
                  >
                    Refresh
                  </Button>
                </div>
                <div>
                  <Pagination
                    backwardText="Previous page"
                    forwardText="Next page"
                    itemsPerPageText="Items per page:"
                    size="md"
                    disabled
                    pageSizes={[10]}
                    totalItems={0}
                  />
                </div>
              </>
            )}

            {sales.isSuccess && sales.data.rows.length > 0 && (
              <>
                <DataTable
                  rows={rows}
                  headers={headers}
                  render={({ rows, headers }) => (
                    <TableContainer
                      title="Tabla sales"
                      description="List of sales and their details"
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader id={header.key} key={header.key}>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.id}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                />
                <div className="">
                  <Pagination
                    backwardText="Previous page"
                    forwardText="Next page"
                    itemsPerPageText="Items per page:"
                    onChange={(e) => {
                      const page = getPage(e.page);
                      const pageSize = getPageSize(e.pageSize);

                      setParams((prev) => {
                        prev.delete("page");
                        prev.delete("limit");
                        prev.set("page", page);
                        prev.set("limit", pageSize);
                        return prev;
                      });
                    }}
                    page={getPage(params.get("page"))}
                    pageSize={getPageSize(params.get("limit"))}
                    pageSizes={PAGE_SIZES}
                    size="md"
                    totalItems={sales.data.count}
                  />
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default SaleList;
