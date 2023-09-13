import { Button, DataTableSkeleton, TableContainer } from "@carbon/react";
import { TableSale, useGetSales } from "../features/sale";
import { Pagination } from "../features/ui";

const SaleList = () => {
  const sales = useGetSales();
  console.log("Sales", sales);

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
              </>
            )}

            {sales.isSuccess && sales.data.rows.length > 0 && (
              <>
                <TableSale data={sales.data.rows} />
                <Pagination count={sales.data.count} />
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default SaleList;
