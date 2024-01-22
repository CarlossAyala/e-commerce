import { Link } from "react-router-dom";
import { Skeleton } from "../../../../../components";
import { productActionRoutes } from "../../product";
import { Formatter } from "../../../../../utils/formatter";

export const CartProductItem = ({ item }) => {
  return (
    <div className="flex gap-x-3 p-4">
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
          <span>U.P {Formatter.currency(item.product.price)}</span>
        </p>
        <div className="mt-auto flex justify-between text-lg font-medium tabular-nums leading-tight">
          <p>x{item.quantity}</p>
          <p>{Formatter.currency(+item.product.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
};

CartProductItem.Skeleton = function CartProductItemSkeleton() {
  return (
    <div className="flex gap-x-3 p-4">
      <Skeleton className="h-16 w-16" />
      <div className="flex grow flex-col gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="mt-auto flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};
