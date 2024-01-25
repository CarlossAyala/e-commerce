import { ReviewStar, Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";

export const ReviewCustomer = ({ review }) => {
  return (
    <div className="space-y-1 p-4 text-sm">
      <div className="flex items-center justify-between">
        <ReviewStar size="sm" rating={review.rating} />
        <p className="font-normal leading-tight text-muted-foreground">
          {Formatter.shortDate(review.updatedAt)}
        </p>
      </div>
      <p className="leading-tight">{review.description}</p>
    </div>
  );
};

ReviewCustomer.Skeleton = function ReviewCustomerSkeleton() {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-end justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};
