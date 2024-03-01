import { useParams } from "react-router-dom";
import {
  EmptyPlaceholder,
  ReviewStar,
  ReviewStarGraph,
  Skeleton,
} from "@/components";
import { useGetReviewStats } from "../../../review";

export const ReviewScore = () => {
  const { productId } = useParams();
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGetReviewStats(productId);

  return (
    <>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            {new Array(6).fill("").map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </div>
        </div>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <p className="text-5xl font-semibold">{reviews.average}</p>
            <div>
              <ReviewStar
                rating={reviews.average}
                size="md"
                className="gap-x-1"
              />
              <p className="text-sm leading-tight text-muted-foreground">
                {reviews.total} reviews
              </p>
            </div>
          </div>
          <ReviewStarGraph ratings={reviews.reviews} />
        </div>
      )}
    </>
  );
};
