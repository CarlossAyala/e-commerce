import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../../../hooks";
import { useGetReviewsCustomer } from "../queries";
import { EmptyPlaceholder, TablePagination } from "../../../../../components";
import { ReviewDone } from "../components/review-done";
import { FaceFrownIcon, StarIcon } from "@heroicons/react/24/outline";

const ReviewsDone = () => {
  const [params] = useSearchParams("status=done");
  const debounceParams = useDebounced(params.toString());

  const {
    data: reviews,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetReviewsCustomer(debounceParams);

  const hasContent = isSuccess && reviews?.rows.length > 0;
  const isEmpty = isSuccess && reviews?.rows.length === 0;

  return (
    <section className="space-y-4">
      {isLoading && (
        <>
          <ReviewDone.Skeleton />
          <ReviewDone.Skeleton />
          <ReviewDone.Skeleton />
        </>
      )}
      {isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching reviews
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {error.message}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      {isEmpty && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={StarIcon} />
          <EmptyPlaceholder.Title>No reviews yet.</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You can leave your review on any product that you have purchased.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      {hasContent &&
        reviews.rows.map((review) => (
          <ReviewDone key={review.id} review={review} />
        ))}

      <TablePagination totalRows={reviews?.count} />
    </section>
  );
};

export default ReviewsDone;
