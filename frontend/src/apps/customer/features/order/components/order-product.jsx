import { Link } from "react-router-dom";
import { productActionRoutes } from "../../product";
import { Formatter } from "../../../../../utils/formatter";
import { Skeleton } from "../../../../../components";

export const OrderProduct = ({ item }) => {
  return (
    <article className="flex gap-4 p-4">
      <img
        className="h-14 w-14 rounded-md border border-black/10 object-contain"
        src="https://http2.mlstatic.com/D_NQ_NP_615787-MLA53225354281_012023-O.webp"
        alt={`Profile ${item.product.name}`}
      />
      <div className="flex grow flex-col">
        <Link
          to={productActionRoutes.detail(item.product.id)}
          target="_blank"
          className="line-clamp-1 text-base leading-tight hover:underline"
        >
          {item.product.name}
        </Link>
        <p className="text-xs leading-tight text-muted-foreground">
          <span>U.P {Formatter.currency(item.price)}</span>
        </p>
        <div className="mt-auto flex justify-between text-base font-medium tabular-nums leading-tight">
          <p>x {item.quantity}</p>
          <p>{Formatter.currency(+item.price * item.quantity)}</p>
        </div>
      </div>
    </article>
  );
};

OrderProduct.Skeleton = function OrderProductSkeleton() {
  return (
    <article className="flex gap-4 p-4">
      <Skeleton className="h-14 w-14 shrink-0 rounded-md" />
      <div className="flex grow flex-col gap-1">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <div className="mt-auto flex justify-between">
          <Skeleton className="h-4 w-1/3 rounded-md" />
          <Skeleton className="h-4 w-1/3 rounded-md" />
        </div>
      </div>
    </article>
  );
};
