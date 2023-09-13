import { Renew } from "@carbon/icons-react";
import { Button, DataTableSkeleton, TableContainer } from "@carbon/react";
import { useSearchParams } from "react-router-dom";
import { TableStockAlert, useStockAlert } from "../features/product";
import { Pagination } from "../features/ui";
import { useDebounce } from "../utils/hooks";

const ProductStockAlert = () => {
  const [params, setParams] = useSearchParams();

  const debounced = useDebounce(params.toString(), 500);

  const products = useStockAlert(debounced);
  console.log("Stock alert", products);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 mt-3">
        {products.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {products.isSuccess && products.data.rows.length === 0 && (
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
                      disabled={products.isLoading}
                      onClick={() => products.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
              </>
            )}

            {products.isSuccess && products.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Stock alert
                  </h2>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of products with low stock.
                  </p>
                </div>
                <TableStockAlert data={products.data.rows} />
                <Pagination count={products.data.count} />
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ProductStockAlert;
