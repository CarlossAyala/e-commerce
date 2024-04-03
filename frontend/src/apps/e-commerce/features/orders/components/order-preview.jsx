import { Link } from "react-router-dom";
import { Badge, Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { orderActionRoutes } from "../utils";
import { OrderPreviewImage } from "./order-preview-image";

export const OrderPreview = ({ order }) => {
  return (
    <article className="rounded-md border">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <Badge variant="outline" className="capitalize">
          {order.status}
        </Badge>
        <p className="text-xs font-medium leading-tight text-muted-foreground">
          {Formatter.shortDate(order.createdAt)}
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
          <div className="font-normal text-muted-foreground">
            <p>{order.address.street}</p>
            <p>
              {order.address.province} ({order.address.zipCode}),{" "}
              {order.address.city}
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
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/5" />
      </div>
      <div className="flex gap-4 p-4">
        <Skeleton className="size-14 shrink-0" />
        <div className="grow space-y-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </article>
  );
};
