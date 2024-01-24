import { Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";

export const OrderSummary = ({ order }) => {
  return (
    <article className="flex items-end justify-between p-4">
      <p className="text-sm text-muted-foreground">Total</p>
      <p className="text-base font-medium leading-tight">
        {Formatter.currency(order.order.total)}
      </p>
    </article>
  );
};

OrderSummary.Skeleton = function OrderSummarySkeleton() {
  return (
    <article className="flex items-end justify-between p-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/4" />
    </article>
  );
};
