import { Link } from "react-router-dom";
import { Formatter } from "@/shared/utils";
import { Skeleton } from "@/shared/components";
import { orderActionRoutes } from "../utils";
import { OrderPreviewImage } from "./order-preview-image";

export const OrderPreview = ({ order }) => {
  return (
    <article className="rounded-md border">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <p className="text-xs font-medium leading-tight text-muted-foreground">
          {Formatter.shortDate(order.createdAt)}
        </p>
        <Link
          to={orderActionRoutes.details(order.id)}
          className="text-sm text-primary hover:underline"
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
    <article className="rounded-md border">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
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
