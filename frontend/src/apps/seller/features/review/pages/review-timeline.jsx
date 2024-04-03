import { useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  Pagination,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { Filters } from "@/components";
import { reviewTimelineColumns } from "../components/columns";
import { useGetReviews } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const ReviewTimeline = () => {
  useDocumentTitle("Review Timeline");
  const [params] = useSearchParams();

  const { data, isLoading, isError, error } = useGetReviews(params.toString());

  return (
    <main className="flex-1 space-y-4 px-6">
      <PageHeader>
        <PageHeaderHeading>Reviews Timeline</PageHeaderHeading>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <DataTableContent columns={reviewTimelineColumns}>
          <EmptyState
            title="No reviews"
            description="No reviews found"
            className="border-none"
          />
        </DataTableContent>
      ) : (
        <DataTable data={data.rows} columns={reviewTimelineColumns} />
      )}

      <Pagination count={data?.count} />
    </main>
  );
};
