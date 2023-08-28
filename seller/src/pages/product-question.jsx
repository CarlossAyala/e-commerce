import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Pagination } from "@carbon/react";
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";
import { useDebounce } from "../utils/hooks";
import { useGetQAAll } from "../features/qa/qa.queries";
import clsx from "clsx";

const headerTable = ["Name", "Status", "Total", ""];

const ProductQuestion = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(() => params.get("name") || "");

  const debounceParams = useDebounce(params.toString(), 500);

  const questions = useGetQAAll(debounceParams);

  console.log("Products", questions);

  const handleSearch = (event) => {
    const search = event.target.value;
    setSearch(search);
    setParams({ ...params, ...(search ? { name: search } : {}) });
  };

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 py-3">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          All questions
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here will appear all questions about your products.
        </p>
      </section>

      <section className="overflow-auto px-4">
        <div className="mb-4">
          <Search
            id="search-product"
            labelText="Icon search"
            placeholder="Search by name"
            onChange={handleSearch}
            value={search}
          />
        </div>

        {questions.isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {questions.isSuccess && questions.data.rows.length === 0 && (
              <div>
                <h2 className="text-base leading-tight text-gray-800">
                  You don&apos;t have any questions yet.
                </h2>
              </div>
            )}

            {questions.isSuccess && questions.data.rows.length > 0 && (
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
                      {questions.data.rows.map((qa) => (
                        <tr key={qa.product.id}>
                          <td>
                            <div className="px-6 py-2">
                              <Link
                                to={`/product/${qa.product.id}/view`}
                                className="text-sm font-semibold leading-none text-blue-800"
                              >
                                {qa.product.name}
                              </Link>
                            </div>
                          </td>
                          <td>
                            <div className="px-4 py-2">
                              <span
                                size="md"
                                className={clsx(
                                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize leading-tight",
                                  qa.product.available
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                )}
                              >
                                {qa.product.available
                                  ? "Available"
                                  : "Unavailable"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-2">
                              <p className="text-sm leading-none text-gray-800">
                                {qa.count}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="px-6 py-2">
                              <Link
                                to={`/product/${qa.product.id}/question/list`}
                              >
                                <p className="leading-none text-blue-600 hover:text-blue-600">
                                  View
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
                    totalItems={questions.data.count.length}
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

export default ProductQuestion;
