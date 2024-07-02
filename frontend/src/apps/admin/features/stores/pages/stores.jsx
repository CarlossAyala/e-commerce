import { useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  URLPagination,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { Filters } from "@/shared/components";
import { storesColumns } from "../components/columns";
import { useGetStores } from "../queries";

const filters = [
  {
    filter_type: "search",
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
    <main className="flex-1 space-y-4 px-6 pb-10">
      <PageHeader>
        <PageHeaderHeading>Stores</PageHeaderHeading>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !stores.rows.length ? (
        <DataTableContent columns={storesColumns}>
          <EmptyState
            title="No stores found"
            description="There're no stores yet."
          />
        </DataTableContent>
      ) : (
        <DataTable data={stores.rows} columns={storesColumns} />
      )}

      <URLPagination count={stores?.count} />
    </main>
  );
};
