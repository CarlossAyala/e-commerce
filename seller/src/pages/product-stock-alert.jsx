import {
  Button,
  DataTable,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  Link,
} from "@carbon/react";
import { useStockAlert } from "../features/product";
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../utils/hooks";
import { Renew } from "@carbon/icons-react";
import { priceFormatter } from "../utils/formatter";
import clsx from "clsx";

const stockAlertHeaders = [
  {
    key: "product",
    header: "Product",
  },
  {
    key: "stock",
    header: "Stock",
  },
  {
    key: "stockAlert",
    header: "Stock Alert",
  },
  {
    key: "price",
    header: "Price",
  },
  {
    key: "status",
    header: "Status",
  },
];

const ProductStockAlert = () => {
  const [params, setParams] = useSearchParams();

  const debounced = useDebounce(params.toString(), 500);

  const stockAlert = useStockAlert(debounced);
  console.log("Stock alert", stockAlert);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 mt-3">
        {stockAlert.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {stockAlert.isSuccess && stockAlert.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Stock alert"
                  description="List of products with low stock"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No stock alert
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that there are no products with low stock.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={stockAlert.isLoading}
                      onClick={() => stockAlert.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
              </>
            )}

            {stockAlert.isSuccess && stockAlert.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Stock alert
                  </h2>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of products with low stock.
                  </p>
                </div>
                <DataTable
                  rows={stockAlert.data.rows.map(
                    ({ id, name, stock, stockAlert, price, available }) => ({
                      id,
                      product: (
                        <Link to={`/product/${id}/view`}>
                          <div className="flex items-center gap-x-1 w-44">
                            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
                              <img
                                className="h-full w-full object-cover"
                                src="https://http2.mlstatic.com/D_NQ_NP_904598-MLU69493154879_052023-O.webp"
                                alt={name}
                              />
                            </div>
                            <div className="grow">
                              <p className="line-clamp-1 text-sm leading-tight text-blue-600">
                                {name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ),
                      stock,
                      stockAlert,
                      price: priceFormatter(price),
                      status: (
                        <span
                          className={clsx(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize leading-tight",
                            available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {available ? "Available" : "Unavailable"}
                        </span>
                      ),
                    })
                  )}
                  headers={stockAlertHeaders}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                id={header.key}
                                key={header.key}
                                className="uppercase"
                              >
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
                </DataTable>
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
                    totalItems={stockAlert.data.count}
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

export default ProductStockAlert;
