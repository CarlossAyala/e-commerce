import { useSearchParams } from "react-router-dom";
import { EmptyState, Pagination } from "@/shared/components";
import { ReviewDone } from "../components/review-done";
import { useGetReviewsDone } from "../queries";

export const ReviewsDone = () => {
  const [params] = useSearchParams();

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGetReviewsDone(params.toString());

  const isEmpty = reviews?.rows.length === 0;

  return (
    <section className="space-y-2">
      {isLoading ? (
        <>
          <ReviewDone.Skeleton />
          <ReviewDone.Skeleton />
          <ReviewDone.Skeleton />
        </>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyState
          title="No reviews yet"
          description="You can leave your review on any product that you have purchased."
        />
      ) : (
        reviews.rows.map((review) => (
          <ReviewDone key={review.id} review={review} />
        ))
      )}

      <Pagination count={reviews?.count} />
    </section>
  );
};
