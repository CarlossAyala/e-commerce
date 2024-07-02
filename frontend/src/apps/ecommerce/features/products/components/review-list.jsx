import { EmptyState, ReviewItem } from "@/shared/components";
import { useGetReviews } from "../../review";

export const ReviewList = ({ productId }) => {
  const { data, isLoading, isError, error } = useGetReviews(productId, "");

  return (
    <div className="grow space-y-6">
      {!productId || isLoading ? (
        <>
          <ReviewItem.Skeleton />
          <ReviewItem.Skeleton />
          <ReviewItem.Skeleton />
        </>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <div>
          <p className="text-sm text-muted-foreground">No reviews yet.</p>
        </div>
      ) : (
        data.rows.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))
      )}
    </div>
  );
};
