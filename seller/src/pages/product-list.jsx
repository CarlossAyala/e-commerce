import { Button, Search } from "@carbon/react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TableProduct, useGetProducts } from "../features/product";
import { Pagination } from "../features/ui";
import { useDebounce } from "../utils/hooks";

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
    <main className="flex w-full flex-col overflow-auto bg-white">
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
              <>
                <TableProduct data={products.data.rows} />
                <Pagination count={products.data.count} />
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ProductList;
