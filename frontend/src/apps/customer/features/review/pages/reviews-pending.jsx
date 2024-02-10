import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../../../hooks";
import { useGetReviewsCustomer } from "../queries";
import { EmptyPlaceholder, Pagination } from "../../../../../components";
import { ReviewPending } from "../components/review-pending";

// TODO: Add search by product name, stars
export const ReviewsPending = () => {
  const [params] = useSearchParams("status=pending");
  const debounceParams = useDebounced(params.toString());

  const {
    data: reviews,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetReviewsCustomer(debounceParams);

  const isEmpty = isSuccess && reviews?.rows.length === 0;

  return (
    <section className="mt-4 space-y-4">
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

      <Pagination totalRows={reviews?.count} />
    </section>
  );
};
