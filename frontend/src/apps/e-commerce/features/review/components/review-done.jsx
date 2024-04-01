import { Link } from "react-router-dom";
import { Card } from "@/components";
import { orderActionRoutes } from "../../order";
import { ReviewCustomer } from "./review-customer";
import { ReviewProduct } from "./review-product";

export const ReviewDone = ({ review }) => {
  const orderId = review.item.orderId;

  return (
    <div className="space-y-1">
      <div className="text-end text-sm">
        <Link
          to={orderActionRoutes.details(orderId)}
          className="font-medium text-blue-600 hover:underline"
        >
          View order
        </Link>
      </div>
      <Card className="divide-y">
        <ReviewProduct product={review.item.product} />
        <ReviewCustomer review={review} />
      </Card>
    </div>
  );
};

ReviewDone.Skeleton = function ReviewDoneSkeleton() {
  return (
    <Card className="divide-y">
      <ReviewProduct.Skeleton />
      <ReviewCustomer.Skeleton />
    </Card>
  );
};
