import { useSearchParams } from "react-router-dom";
import { Pagination } from "@/shared/components";
import { EmptyPlaceholder } from "@/components";
import { ReviewPending } from "../components/review-pending";
import { useGetReviewsPending } from "../queries";

// TODO: Add search by product name, stars
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
    <section className="space-y-2">
      {isLoading ? (
        <>
          <ReviewPending.Skeleton />
          <ReviewPending.Skeleton />
          <ReviewPending.Skeleton />
        </>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder title="No reviews" description="You're up to date!" />
      ) : (
        reviews.rows.map((review) => (
          <ReviewPending key={review.id} review={review} />
        ))
      )}

      <Pagination count={reviews?.count} />
    </section>
  );
};
