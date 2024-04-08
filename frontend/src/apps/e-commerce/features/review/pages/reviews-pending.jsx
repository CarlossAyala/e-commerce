import { useSearchParams } from "react-router-dom";
import { EmptyState, URLPagination } from "@/shared/components";
import { ReviewPending } from "../components/review-pending";
import { useGetReviewsPending } from "../queries";

export const ReviewsPending = () => {
  const [params] = useSearchParams();

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGetReviewsPending(params.toString());

  const isEmpty = reviews?.rows.length === 0;

  return (
    <section className="space-y-4">
      {isLoading ? (
        <>
          <ReviewPending.Skeleton />
          <ReviewPending.Skeleton />
          <ReviewPending.Skeleton />
        </>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyState title="No reviews" description="You're up to date!" />
      ) : (
        reviews.rows.map((review) => (
          <ReviewPending key={review.id} review={review} />
        ))
      )}

      <URLPagination count={reviews?.count} />
    </section>
  );
};
