import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Button, ReviewStar, Skeleton } from "../../../../../../components";
import { Formatter } from "../../../../../../utils/formatter";
import { useDislikeReview, useLikeReview } from "../../../review";

export const ReviewComment = ({ review }) => {
  const like = useLikeReview(review.productId);
  const dislike = useDislikeReview(review.productId);

  const handleLike = () => {
    like.mutate(review.id);
  };

  const handleDislike = () => {
    dislike.mutate(review.id);
  };

  return (
    <article>
      <div className="mb-1 flex items-center justify-between gap-x-2">
        <ReviewStar size="sm" rating={review.rating} />
        <p className="text-sm leading-tight text-muted-foreground">
          {Formatter.shortDate(review.updatedAt)}
        </p>
      </div>
      <div>
        <p className="text-sm leading-tight">{review.description}</p>
      </div>
      <div className="mt-2 flex gap-x-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="items-center gap-x-1 px-2 py-0 text-base text-muted-foreground"
          disabled={like.isLoading || dislike.isLoading}
          onClick={handleLike}
        >
          <HandThumbUpIcon className="h-5 w-5" /> {review.like}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="items-center gap-x-1 px-2 py-0 text-base text-muted-foreground"
          disabled={like.isLoading || dislike.isLoading}
          onClick={handleDislike}
        >
          <HandThumbDownIcon className="h-5 w-5" /> {review.dislike}
        </Button>
      </div>
    </article>
  );
};

ReviewComment.Skeleton = function ReviewCommentSkeleton() {
  return (
    <div className="space-y-2">
      <div className="mb-2 flex items-center justify-between gap-x-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
      <div className="mt-2 flex gap-x-4">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
    </div>
  );
};

ReviewComment.Empty = function ReviewCommentEmpty() {
  return (
    <div>
      <p className="text-sm leading-tight text-muted-foreground">
        There are no reviews yet.
      </p>
    </div>
  );
};

ReviewComment.Error = function ReviewCommentError() {
  return (
    <div>
      <p className="text-sm leading-tight text-muted-foreground">
        There was an error loading the reviews.
      </p>
    </div>
  );
};
