import { Filters } from "@/components";
import { ListTable } from "../components/list-table";

const filters = [
  {
    filter_type: "search",
  },
];

export const ProductList = () => {
  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Product List
      </h2>

      <Filters filters={filters} />

      <ListTable />
    </main>
  );
};
