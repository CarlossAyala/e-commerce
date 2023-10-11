import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { ReviewStar, Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";

export const ReviewCustomer = ({ review }) => {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-end justify-between">
        <ReviewStar size="sm" rating={review.rating} />
        <p className="text-sm font-normal leading-tight text-muted-foreground">
          {Formatter.shortDate(review.updatedAt)}
        </p>
      </div>
      <p className="text-sm font-normal leading-tight">{review.description}</p>
      <div className="flex gap-4">
        <div className="flex items-center gap-2 rounded-md border border-black/10 px-2 py-1">
          <HandThumbUpIcon className="h-5 w-5" />
          <span>{review.like}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-black/10 px-2 py-1">
          <HandThumbDownIcon className="h-5 w-5" />
          <span>{review.dislike}</span>
        </div>
      </div>
    </div>
  );
};

ReviewCustomer.Skeleton = function ReviewCustomerSkeleton() {
  return (
    <div className="space-y-2 p-4">
      <div className="flex items-end justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-6 w-10" />
      </div>
    </div>
  );
};
