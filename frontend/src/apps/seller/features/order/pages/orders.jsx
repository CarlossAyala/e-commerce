import { Filters } from "@/components";
import { OrdersTable } from "../components/orders-table";

const filters = [
  {
    filter_type: "search",
    placeholder: "Search by ID",
  },
];

export const Orders = () => {
  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Orders Overview
      </h2>

      <Filters filters={filters} />

      <OrdersTable />
    </main>
  );
};
