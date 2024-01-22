import { Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";
import { getOrderQty } from "../utils";

export const OrderSummary = ({ order }) => {
  const itemsQty = getOrderQty(order);

  return (
    <article className="p-4">
      <div className="flex items-end justify-between">
        <p className="text-sm text-muted-foreground">Products</p>
        <p className="text-base font-medium leading-tight">{itemsQty}</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm text-muted-foreground">Total</p>
        <p className="text-base font-medium leading-tight">
          {Formatter.currency(order.order.total)}
        </p>
      </div>
    </article>
  );
};

OrderSummary.Skeleton = function OrderSummarySkeleton() {
  return (
    <article className="space-y-2 p-4">
      <div className="flex items-end justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/3" />
      </div>
      <div className="flex items-end justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </article>
  );
};
