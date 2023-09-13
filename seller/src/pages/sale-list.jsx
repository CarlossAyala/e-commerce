import { TableSale, useGetSales } from "../features/sale";

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
        <TableSale {...sales} hasPagination />
      </section>
    </main>
  );
};

export default SaleList;
