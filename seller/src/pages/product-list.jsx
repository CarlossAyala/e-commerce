import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Pagination, Search } from "@carbon/react";
import clsx from "clsx";
import { useGetProducts } from "../features/product";
import { useDebounce } from "../utils/hooks";
import { priceFormatter } from "../../../customer/src/utils/formatter";
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";

const headerTable = ["Name", "Stock", "Sold", "Price", "Status", ""];

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();

  const debounceParams = useDebounce(params.toString(), 500);

  const products = useGetProducts(debounceParams);

  console.log("Products", products);

  const handleSearch = (event) => {
    const search = event.target.value;
    setSearch(search);
    setParams({ ...params, ...(search ? { name: search } : {}) });
  };

  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto bg-white">
      <section className="px-4 py-3">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Product List
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here you will see a list of all the products you have made.
        </p>
      </section>

      <section className="overflow-auto px-4">
        <div className="mb-4">
          <Search
            labelText="Icon search"
            onChange={handleSearch}
            value={search}
          />
        </div>

        {products.isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {products.isSuccess && products.data.rows.length === 0 && (
              <div className="">
                <h2 className="text-base font-semibold leading-tight text-gray-800">
                  You don&apos;t have any products yet.
                </h2>
                <p className="mt-1 text-sm leading-tight text-gray-600">
                  Start by creating one.
                </p>
                <Link to="/product/new" className="mt-2 inline-block">
                  <Button size="md">Create Product</Button>
                </Link>
              </div>
            )}

            {products.isSuccess && products.data.rows.length > 0 && (
              <div className="overflow-hidden border border-black/20 shadow-sm">
                <div className="overflow-auto">
                  <table className="min-w-full">
                    <thead className="border-b border-black/20 bg-gray-100">
                      <tr>
                        {headerTable.map((header) => (
                          <th
                            key={header}
                            scope="col"
                            className="px-6 py-3 text-left"
                          >
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-900">
                                {header}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {products.data.rows.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="px-6 py-2">
                              <Link
                                to={`/product/${product.id}/view`}
                                className="text-sm font-semibold leading-none text-blue-800"
                              >
                                {product.name}
                              </Link>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-2">
                              <p className="text-sm leading-none text-gray-800">
                                {product.stock}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-2">
                              <p className="text-sm leading-none text-gray-800">
                                {product.sold}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-2">
                              <p className="text-sm leading-none text-gray-800">
                                {priceFormatter(product.price)}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-4 py-2">
                              <span
                                size="md"
                                className={clsx(
                                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize leading-tight",
                                  product.available
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                )}
                              >
                                {product.available
                                  ? "Available"
                                  : "Unavailable"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-2">
                              <Link to={`/product/${product.id}/edit`}>
                                <p className="leading-none text-blue-600 hover:text-blue-600">
                                  Edit
                                </p>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
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
                    totalItems={products.data.count}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ProductList;
