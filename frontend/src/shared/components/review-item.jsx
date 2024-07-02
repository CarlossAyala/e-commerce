import { StarIcon } from "@heroicons/react/24/solid";
import { Formatter, cn } from "../utils";
import { Skeleton } from ".";

export const ReviewItem = ({ review }) => {
  return (
    <article className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {new Array(5).fill(0).map((_, index) => (
            <StarIcon
              key={index}
              className={cn(
                "size-4 shrink-0",
                index < review.rating ? "text-yellow-400" : "text-gray-300",
              )}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {Formatter.shortDate(review.createdAt)}
        </p>
      </div>
      <div>
        <p className="text-sm">{review.description}</p>
      </div>
    </article>
  );
};

ReviewItem.Skeleton = function ReviewItemSkeleton() {
  return (
    <article className="space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </article>
  );
};
