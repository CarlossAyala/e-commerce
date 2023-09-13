import { Pagination, Search } from "@carbon/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";
import { TableQuestion } from "../features/qa";
import { useGetQAAll } from "../features/qa/qa.queries";
import { useDebounce } from "../utils/hooks";

const headerTable = ["Name", "Status", "Total", ""];

const QuestionOverview = () => {
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
          Overview
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
              <>
                <TableQuestion data={questions.data.rows} />
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
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default QuestionOverview;
