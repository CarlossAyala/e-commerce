import { ReviewComments } from "./review-comments";
import { ReviewScore } from "./review-score";

export const Review = () => {
  return (
    <div className="grid-cols-3 gap-4 space-y-4 sm:grid sm:space-y-0">
      <ReviewScore />
      <div className="col-span-2 space-y-2">
        <h3 className="text-sm font-medium leading-snug">Comments</h3>
        {/* <ReviewComments /> */}
      </div>
    </div>
  );
};
