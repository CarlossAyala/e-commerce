import { useSearchParams } from "react-router-dom";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  EmptyState,
  PageHeader,
  PageHeaderHeading,
  URLPagination,
  Filters,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { overviewColumns } from "../components/columns";
import { useGetReviews } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const ReviewsOverview = () => {
  useDocumentTitle("Reviews");
  const [params] = useSearchParams();

  const { data, isLoading, isError, error } = useGetReviews(params.toString());

  return (
    <main className="flex-1 space-y-4 px-4 tablet:px-6">
      <PageHeader>
        <PageHeaderHeading>Reviews</PageHeaderHeading>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <DataTableSkeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <DataTableContent columns={overviewColumns}>
          <EmptyState
            title="No reviews"
            description="No reviews found"
            className="border-none"
          />
        </DataTableContent>
      ) : (
        <DataTable data={data.rows} columns={overviewColumns} />
      )}

      <URLPagination count={data?.count} />
    </main>
  );
};
