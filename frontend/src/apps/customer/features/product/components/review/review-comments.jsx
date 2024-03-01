import { useParams } from "react-router-dom";
import { useGetReviews } from "../../../review";
import { ReviewComment } from "./review-comment";
import { EmptyPlaceholder } from "@/components";

export const ReviewComments = () => {
  const { productId } = useParams();
  const { data: reviews, isLoading, isError, error } = useGetReviews(productId);

  const isEmpty = reviews?.rows.length === 0;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <ReviewComment.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No comments"
          description="Be the first to comment on this product."
        />
      ) : (
        reviews.rows.map((review) => (
          <ReviewComment key={review.id} review={review} />
        ))
      )}
    </div>
  );
};
