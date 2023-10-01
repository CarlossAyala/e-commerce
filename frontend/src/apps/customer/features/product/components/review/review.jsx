import { ReviewComments } from "./review-comments";
import { ReviewScore } from "./review-score";

export const Review = ({ productId }) => {
  return (
    <div className="mt-2 flex flex-col gap-10 sm:flex-row">
      <div className="max-w-xs shrink-0 grow space-y-2">
        <h3 className="text-sm font-medium leading-snug">Score</h3>
        <ReviewScore productId={productId} />
      </div>
      <div className="grow space-y-2">
        <h3 className="text-sm font-medium leading-snug">Comments</h3>
        <ReviewComments productId={productId} />
      </div>
    </div>
  );
};
