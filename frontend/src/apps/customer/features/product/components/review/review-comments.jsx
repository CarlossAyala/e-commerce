import { useGetReviews } from "../../../review";
import { ReviewComment } from "./review-comment";

export const ReviewComments = ({ productId }) => {
  const {
    data: reviews,
    isLoading,
    isSuccess,
    isError,
  } = useGetReviews(productId);

  const hasContent = isSuccess && reviews.rows.length > 0;
  const isEmpty = isSuccess && reviews.rows.length === 0;

  return (
    <div className="space-y-6">
      {isLoading && (
        <>
          <ReviewComment.Skeleton />
          <ReviewComment.Skeleton />
          <ReviewComment.Skeleton />
          <ReviewComment.Skeleton />
          <ReviewComment.Skeleton />
        </>
      )}
      {isError && <ReviewComment.Error />}
      {isEmpty && <ReviewComment.Empty />}
      {hasContent &&
        reviews.rows.map((review) => (
          <ReviewComment key={review.id} review={review} />
        ))}
    </div>
  );
};
