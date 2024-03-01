import { Filters } from "@/components";
import { StockAlertTable } from "../components/stock-alert-table";

const filters = [
  {
    filter_type: "search",
  },
];

export const ProductStockAlert = () => {
  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Stock Alert
      </h2>

      <Filters filters={filters} />

      <StockAlertTable />
    </main>
  );
};
