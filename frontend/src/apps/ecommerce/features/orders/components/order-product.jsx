import { Link } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { Formatter } from "@/shared/utils";
import { Skeleton } from "@/shared/components";
import { productActionRoutes } from "../../products";

export const OrderProduct = ({ item }) => {
  const subTotal = +item.product.price * item.quantity;
  const image = item.product.gallery.length
    ? item.product.gallery[0].url
    : placeholder;

  return (
    <Link to={productActionRoutes.details(item.product)}>
      <article className="flex gap-3">
        <img
          src={image}
          alt="Product"
          className="size-16 rounded-lg border object-cover object-center"
        />
        <div className="grow">
          <h3 className="line-clamp-1 text-base">{item.product.name}</h3>
          <div>
            <p className="text-xs text-muted-foreground">
              UP {Formatter.currency(item.product.price)}
            </p>
            <div className="flex justify-between text-base font-medium">
              <p>x {item.quantity}</p>
              <p>{Formatter.currency(subTotal)}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

OrderProduct.Skeleton = function OrderProductSkeleton() {
  return (
    <article className="flex gap-3">
      <Skeleton className="size-16 shrink-0" />
      <div className="grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </article>
  );
};
