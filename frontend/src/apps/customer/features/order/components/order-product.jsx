import { Link } from "react-router-dom";
import { Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { productActionRoutes } from "../../product";

export const OrderProduct = ({ item }) => {
  return (
    <article className="flex gap-4">
      <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
        <img
          className="size-full object-contain"
          src="https://http2.mlstatic.com/D_NQ_NP_970053-MLU69515847455_052023-W.webp"
          alt="Alt"
        />
      </div>
      <div className="flex grow flex-col justify-center">
        <Link
          to={productActionRoutes.details(item.product)}
          className="truncate leading-tight hover:underline"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          UP {Formatter.currency(+item.price)}
        </p>
        <div className="flex justify-between gap-2 font-medium leading-tight">
          <p>x{item.quantity}</p>
          <p>{Formatter.currency(+item.price * item.quantity)}</p>
        </div>
      </div>
    </article>
  );
};

OrderProduct.Skeleton = function OrderProductSkeleton() {
  return (
    <article className="flex gap-4 p-4">
      <Skeleton className="size-14 shrink-0" />
      <div className="flex grow flex-col gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/4" />
        <div className="mt-auto flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </article>
  );
};
