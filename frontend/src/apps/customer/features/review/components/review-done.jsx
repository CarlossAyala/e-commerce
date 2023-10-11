import { ReviewCustomer } from "./review-customer";
import { ReviewProduct } from "./review-product";

export const ReviewDone = ({ review }) => {
  return (
    <div className="divide-y divide-black/10 rounded-md border border-black/10">
      <ReviewProduct product={review.product} />
      <ReviewCustomer review={review} />
    </div>
  );
};

ReviewDone.Skeleton = function ReviewDoneSkeleton() {
  return (
    <div className="divide-y divide-black/10 rounded-md border border-black/10">
      <ReviewProduct.Skeleton />
      <ReviewCustomer.Skeleton />
    </div>
  );
};
