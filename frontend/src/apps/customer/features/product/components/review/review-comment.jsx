import { ReviewStar, Skeleton } from "../../../../../../components";
import { Formatter } from "../../../../../../utils/formatter";

export const ReviewComment = ({ review }) => {
  return (
    <article className="rounded border p-2">
      <div className="mb-1 flex items-center justify-between gap-x-2">
        <ReviewStar size="sm" rating={review.rating} />
        <p className="text-sm leading-tight text-muted-foreground">
          {Formatter.shortDate(review.updatedAt)}
        </p>
      </div>
      <div>
        <p className="text-sm leading-tight">{review.description}</p>
      </div>
    </article>
  );
};

ReviewComment.Skeleton = function ReviewCommentSkeleton() {
  return (
    <ol className="space-y-4">
      {new Array(3).fill("").map((_, index) => (
        <li key={index} className="space-y-2 rounded border p-2">
          <div className="flex items-center justify-between gap-x-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          {/*TODO: Check skeleton*/}
          <div className="flex gap-2">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-5 w-10" />
          </div>
        </li>
      ))}
    </ol>
  );
};
