import { Link } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { productActionRoutes } from "../features/products";

export const ProductCardRow = ({ product }) => {
  const image = product.gallery.length ? product.gallery[0].url : placeholder;

  return (
    <Link to={productActionRoutes.details(product)}>
      <article className="flex gap-3">
        <img
          src={image}
          alt="Product Card Image"
          className="size-16 rounded-lg border object-cover object-center"
        />
        <div className="grow">
          <h3 className="line-clamp-1 text-base text-primary">
            {product.name}
          </h3>
          <div className="flex text-xs text-muted-foreground">
            <p>UP {Formatter.currency(product.price)}</p>
            <p className="ml-2 border-l pl-2">Stock {product.stock}</p>
            <p className="ml-2 border-l pl-2">
              {product.available ? "Available" : "Unavailable"}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

ProductCardRow.Skeleton = function ProductCardRowSkeleton() {
  return (
    <article className="flex gap-3">
      <Skeleton className="size-16 shrink-0" />
      <div className="grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </article>
  );
};
