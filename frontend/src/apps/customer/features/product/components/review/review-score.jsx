import {
  ReviewStar,
  ReviewStarGraph,
  Skeleton,
} from "../../../../../../components";
import { useGetReviewStats } from "../../../review";

export const ReviewScore = ({ productId }) => {
  const reviews = useGetReviewStats(productId);

  if (reviews.isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-14 w-28" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="space-y-2 py-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    );
  }
  if (reviews.isError) {
    return <p className="text-sm text-muted-foreground">Error loading score</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-5xl font-semibold leading-none">
          {reviews.data.average}
        </p>
        <div className="mt-1">
          <ReviewStar
            rating={reviews.data.average}
            size="lg"
            className="gap-x-1"
          />
          <p className="mt-1 text-sm leading-tight text-muted-foreground">
            {reviews.data.total} reviews
          </p>
        </div>
      </div>
      <div>
        <ReviewStarGraph ratings={reviews.data.reviews} />
      </div>
    </div>
  );
};
