import { Link } from "react-router-dom";
import { Formatter } from "../../../../../utils/formatter";
import { orderActionRoutes } from "../utils";
import { Skeleton } from "../../../../../components";

export const OrderPreview = ({ order }) => {
  return (
    <article className="rounded-md border border-black/10">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-2">
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
        {order.items.length === 1 ? (
          <div className="size-14 shrink-0 overflow-hidden rounded-md border shadow">
            <img
              src="https://http2.mlstatic.com/D_697502-MLU72567972782_112023-N.jpg"
              alt="xxx"
              className="h-full w-full object-cover"
            />
          </div>
        ) : order.items.length === 2 ? (
          <div className="relative size-14 shrink-0">
            <div className="absolute left-0 top-0 z-10 size-10 overflow-hidden rounded-md border shadow">
              <img
                src="https://http2.mlstatic.com/D_697502-MLU72567972782_112023-N.jpg"
                alt="xxx"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 z-0 size-10 overflow-hidden rounded-md border shadow">
              <img
                src="https://http2.mlstatic.com/D_942301-MLA43498437450_092020-N.jpg"
                alt="xxx"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : order.items.length === 3 ? (
          <div className="relative size-14 shrink-0">
            <div className="absolute left-0 top-0 z-30 size-8 overflow-hidden rounded-md border shadow">
              <img
                src="https://http2.mlstatic.com/D_942301-MLA43498437450_092020-N.jpg"
                alt="a"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-0 top-1/2 z-20 size-8 -translate-y-1/2 overflow-hidden rounded-md border shadow">
              <img
                src="https://http2.mlstatic.com/D_751939-MLA46221843872_052021-N.jpg"
                alt="a"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 z-10 size-8 translate-x-1/4 overflow-hidden rounded-md border shadow">
              <img
                src="https://http2.mlstatic.com/D_NQ_NP_949764-MLA46043438480_052021-O.webp"
                alt="a"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="grid shrink-0 grid-cols-2 overflow-hidden rounded-md border shadow">
            <div className="size-7">
              <img
                src="https://http2.mlstatic.com/D_942301-MLA43498437450_092020-N.jpg"
                alt="xxx"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="size-7">
              <img
                src="https://http2.mlstatic.com/D_751939-MLA46221843872_052021-N.jpg"
                alt="aaa"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="size-7">
              <img
                src="https://http2.mlstatic.com/D_NQ_NP_949764-MLA46043438480_052021-O.webp"
                alt="aaa"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid size-7 place-items-center text-sm text-muted-foreground">
              {order.items.length - 3}+
            </div>
          </div>
        )}

        <div className="grow space-y-1 text-sm leading-tight">
          <p className="font-semibold capitalize">{order.status}</p>
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
      </div>
      <div className="flex gap-4 p-4">
        <Skeleton className="h-14 w-14 shrink-0" />
        <div className="grow space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </article>
  );
};
