import { Link } from "react-router-dom";
import { Formatter } from "../../../../../utils/formatter";
import { orderActionRoutes } from "../utils";
import { Badge, Skeleton } from "../../../../../components";
import { OrderPreviewImage } from "./order-preview-image";

export const OrderPreview = ({ order }) => {
  return (
    <article className="rounded-md border border-black/10">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-2">
        <Badge variant="outline" className="capitalize">
          {order.status}
        </Badge>
        <p className="text-xs font-medium leading-tight text-muted-foreground">
          {Formatter.shortDate(order.orderedAt)}
        </p>
        <Link
          to={orderActionRoutes.details(order.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          View
        </Link>
      </div>
      <div className="flex gap-4 p-4">
        <OrderPreviewImage order={order} />

        <div className="grow space-y-1 text-sm leading-tight">
          <p className="font-medium">Shipping</p>
          <div>
            <p className="font-normal text-muted-foreground">{order.street}</p>
            <p className="font-normal text-muted-foreground">
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
    <article className="rounded-md border border-black/10">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex gap-4 p-4">
        <Skeleton className="h-14 w-14 shrink-0" />
        <div className="grow space-y-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </article>
  );
};
