import { Link } from "react-router-dom";
import { Formatter } from "../../../../../utils/formatter";
import { orderActionRoutes } from "../utils";
import { Skeleton } from "../../../../../components";

export const OrderPreview = ({ order }) => {
  return (
    <article className="rounded-md border border-black/10">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-2">
        <p className="text-xs font-medium leading-tight">
          {Formatter.shortDate(order.orderedAt)}
        </p>
        <Link
          to={orderActionRoutes.details(order.id)}
          className="text-sm hover:underline"
        >
          View Details
        </Link>
      </div>
      <div className="flex gap-4 p-4">
        <div className="h-14 w-14 shrink-0 rounded-md bg-slate-200"></div>
        <div className="grow space-y-1">
          <p className="text-sm font-semibold capitalize leading-tight">
            {order.status}
          </p>
          <div>
            <p className="text-sm font-normal leading-tight text-muted-foreground">
              {order.street}
            </p>
            <p className="text-sm font-normal leading-tight text-muted-foreground">
              {order.province} ({order.zipCode}), {order.city}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

OrderPreview.Skeleton = function OrderPreviewSkeleton() {
  return (
    <div className="rounded-md border border-black/10">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex gap-4 p-4">
        <Skeleton className="h-14 w-14 shrink-0" />
        <div className="grow space-y-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};
