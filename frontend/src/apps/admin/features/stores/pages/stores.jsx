import { useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  Pagination,
} from "@/shared/components";
import { EmptyPlaceholder, Filters } from "@/components";
import { storesColumns } from "../components/columns";
import { useGetStores } from "../queries";
import { useDocumentTitle } from "@/shared/hooks";

const filters = [
  {
    filter_type: "search",
  },
  {
    filter_type: "group",
    headline: "Official",
    groups: [
      {
        filter_type: "switch",
        items: [
          {
            name: "official",
            label: "Official",
            value: "yes",
          },
        ],
      },
    ],
  },
];

export const Stores = () => {
  useDocumentTitle("Stores");
  const [params] = useSearchParams();

  const {
    data: stores,
    isLoading,
    isError,
    error,
  } = useGetStores(params.toString());

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">Stores</h2>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !stores.rows.length ? (
        <DataTableContent columns={storesColumns}>
          <div className="grid h-44 place-content-center">
            <p>No stores found</p>
          </div>
        </DataTableContent>
      ) : (
        <DataTable data={stores.rows} columns={storesColumns} />
      )}

      <Pagination count={stores?.count} />
    </main>
  );
};
