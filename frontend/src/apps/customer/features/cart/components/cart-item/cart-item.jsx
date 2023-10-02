import clsx from "clsx";
import { Formatter } from "../../../../../../utils/formatter";
import { Link } from "react-router-dom";
import { productActionRoutes } from "../../../product";
import { QuantityItem } from "./quantity-item";
import { VisibilityItem } from "./visibility-item";
import { RemoveItem } from "./remove-item";
import { Skeleton } from "../../../../../../components";

export const CartItem = ({ item }) => {
  const hasStock = item.product.stock > 0;

  return (
    <article className={clsx("space-y-3 p-4", !item.visible && "opacity-50")}>
      <div className="flex gap-x-3">
        <div className="h-16 w-16 shrink-0 rounded-md border border-black/10">
          <img
            className="h-full w-full object-contain"
            src="https://http2.mlstatic.com/D_NQ_NP_615787-MLA53225354281_012023-O.webp"
            alt={`Product ${item.product.name}`}
          />
        </div>
        <div className="flex grow flex-col">
          <Link
            to={productActionRoutes.detail(item.product.id)}
            target="_blank"
            className="line-clamp-1 text-base leading-tight hover:underline"
          >
            {item.product.name}
          </Link>
          <p className="text-xs leading-tight text-muted-foreground">
            <span>U.P {Formatter.money(+item.product.price)}</span>
            {hasStock && <span> | Stock: {item.product.stock}</span>}
          </p>
          <p className="mt-auto text-lg font-medium tabular-nums leading-tight">
            {Formatter.money(+item.product.price * item.quantity)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <VisibilityItem item={item} />

        <QuantityItem item={item} />

        <RemoveItem item={item} />
      </div>
    </article>
  );
};

CartItem.Skeleton = function CartItemSkeleton() {
  return (
    <div className="space-y-3 py-4">
      <div className="flex gap-x-3">
        <Skeleton className="h-16 w-16 shrink-0" />
        <div className="flex grow flex-col gap-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="mt-auto h-6 w-full" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-9 w-9" />
        <div className="flex gap-1">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-9" />
        </div>
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  );
};
