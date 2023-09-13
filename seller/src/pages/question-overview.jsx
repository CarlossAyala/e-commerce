import { Search } from "@carbon/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TableQuestion } from "../features/qa";
import { useGetQAAll } from "../features/qa/qa.queries";
import { useDebounce } from "../utils/hooks";

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

        <TableQuestion {...questions} hasPagination />
      </section>
    </main>
  );
};

export default QuestionOverview;
