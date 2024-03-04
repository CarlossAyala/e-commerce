import { useSearchParams } from "react-router-dom";
import { EmptyPlaceholder, Filters } from "@/components";
import {
  DataTable,
  DataTableContent,
  DataTableSkeleton,
  Pagination,
} from "@/shared/components";
import { reviewTimelineColumns } from "../components";
import { useGetReviews } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const ReviewTimeline = () => {
  const [params] = useSearchParams();

  const reviews = useGetReviews(params.toString());

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Reviews Timeline
      </h2>

      <Filters filters={filters} />

      {reviews.isLoading ? (
        <DataTableSkeleton />
      ) : reviews.isError ? (
        <EmptyPlaceholder title="Error" description={reviews.error.message} />
      ) : !reviews.data?.rows.length ? (
        <DataTableContent columns={reviewTimelineColumns}>
          <div className="grid h-44 place-content-center">
            <p>No reviews found</p>
          </div>
        </DataTableContent>
      ) : (
        <DataTable data={reviews.data.rows} columns={reviewTimelineColumns} />
      )}
      <Pagination count={reviews.data?.count} />
    </main>
  );
};
