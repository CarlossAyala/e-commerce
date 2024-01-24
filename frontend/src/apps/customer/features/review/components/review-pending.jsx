import { Link } from "react-router-dom";
import { ReviewProduct } from "./review-product";
import { Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";
import { reviewActionRoutes } from "../utils";

export const ReviewPending = ({ review }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-end justify-between text-xs">
        <p className="font-normal leading-tight text-muted-foreground">
          {Formatter.shortDate(review.createdAt)}
        </p>
        <Link
          to={reviewActionRoutes.new(review.id)}
          className="font-medium text-blue-600 hover:underline"
        >
          Create review
        </Link>
      </div>
      <ReviewProduct
        product={review.product}
        className="rounded-md border border-black/10"
      />
    </div>
  );
};

ReviewPending.Skeleton = function ReviewPendingSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <ReviewProduct.Skeleton className="rounded-md border border-black/10" />
    </div>
  );
};
