import { Link } from "react-router-dom";
import { Card, Skeleton } from "@/components";
import { orderActionRoutes } from "../../orders";
import { ReviewCustomer } from "./review-customer";
import { ReviewProduct } from "./review-product";

export const ReviewDone = ({ review }) => {
  const orderId = review.item.orderId;

  return (
    <div className="space-y-1">
      <div className="text-start text-sm">
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
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/4" />
      <Card className="divide-y">
        <ReviewProduct.Skeleton />
        <ReviewCustomer.Skeleton />
      </Card>
    </div>
  );
};
