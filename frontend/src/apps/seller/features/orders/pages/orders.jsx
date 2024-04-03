import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  Pagination,
} from "@/shared/components";
import { Filters } from "@/components";
import { ordersColumns } from "../components/columns";
import { useGetOrders } from "../queries";

const filters = [
  {
    filter_type: "search",
    placeholder: "Search by ID",
  },
];

export const Orders = () => {
  useDocumentTitle("Orders Overview");
  const [params] = useSearchParams();
  const { data, isLoading, isError, error } = useGetOrders(params.toString());

  return (
    <main className="flex-1 space-y-4 px-6">
      <PageHeader>
        <PageHeaderHeading>Orders Overview</PageHeaderHeading>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <DataTableContent columns={ordersColumns}>
          <EmptyState
            title="No orders"
            description="No orders found"
            className="border-none"
          />
        </DataTableContent>
      ) : (
        <DataTable columns={ordersColumns} data={data.rows} />
      )}

      <Pagination count={data?.count} />
    </main>
  );
};
