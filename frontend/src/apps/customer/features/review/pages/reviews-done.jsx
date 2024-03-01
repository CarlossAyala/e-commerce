import { useSearchParams } from "react-router-dom";
import { EmptyPlaceholder, Pagination } from "@/components";
import { ReviewDone } from "../components/review-done";
import { useGetReviewsCustomer } from "../queries";

// TODO: Add search by product name, stars
export const ReviewsDone = () => {
  const [params] = useSearchParams("status=done");

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGetReviewsCustomer(params.toString());

  const isEmpty = reviews?.rows.length === 0;

  return (
    <section className="mt-4 space-y-4">
      {isLoading ? (
        <>
          <ReviewDone.Skeleton />
          <ReviewDone.Skeleton />
          <ReviewDone.Skeleton />
        </>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No reviews yet"
          description="You can leave your review on any product that you have purchased."
        />
      ) : (
        reviews.rows.map((review) => (
          <ReviewDone key={review.id} review={review} />
        ))
      )}

      <Pagination totalRows={reviews?.count} />
    </section>
  );
};
