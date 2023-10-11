import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../../../hooks";
import { useGetReviewsCustomer } from "../queries";
import { EmptyPlaceholder, TablePagination } from "../../../../../components";
import { FaceFrownIcon, SunIcon } from "@heroicons/react/24/outline";
import { ReviewPending } from "../components/review-pending";

const ReviewsPending = () => {
  const [params] = useSearchParams("status=pending");
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
          <ReviewPending.Skeleton />
          <ReviewPending.Skeleton />
          <ReviewPending.Skeleton />
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
          <EmptyPlaceholder.Icon icon={SunIcon} />
          <EmptyPlaceholder.Title>
            Congratulations, you&apos;re up to date!
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You already gave your review on all your products. Continue
            collaborating with the community with your reviews.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      {hasContent &&
        reviews.rows.map((review) => (
          <ReviewPending key={review.id} review={review} />
        ))}

      <TablePagination totalRows={reviews?.count} />
    </section>
  );
};

export default ReviewsPending;
