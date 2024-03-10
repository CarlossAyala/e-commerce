import { useSearchParams } from "react-router-dom";
import { DataTable, DataTableSkeleton, Pagination } from "@/shared/components";
import { EmptyPlaceholder, Filters } from "@/components";
import { requestsVerifyColumns } from "../components/columns";
import { useGetRequestsVerify } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
  {
    filter_type: "group",
    headline: "Status",
    groups: [
      {
        filter_type: "checkbox",
        name: "status",
        items: [
          {
            label: "Queue",
            value: "queue",
          },
          {
            label: "Approved",
            value: "approved",
          },
          {
            label: "Rejected",
            value: "rejected",
          },
        ],
      },
    ],
  },
];

export const RequestsVerify = () => {
  const [params] = useSearchParams();
  const {
    data: requests,
    isLoading,
    isError,
    error,
  } = useGetRequestsVerify(params.toString());

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Requests Verify
      </h2>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !requests?.rows.length ? (
        <EmptyPlaceholder
          title="No requests"
          description="No requests found."
        />
      ) : (
        <DataTable data={requests.rows} columns={requestsVerifyColumns} />
      )}

      <Pagination count={requests?.count} />
    </main>
  );
};
