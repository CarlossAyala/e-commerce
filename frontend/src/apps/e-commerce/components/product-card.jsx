import { Link } from "react-router-dom";
import placeholderImage from "@/assets/images/placeholder-image.jpg";
import { Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { productActionRoutes } from "../features/products";

export const ProductCard = ({ product }) => {
  const image = product.gallery.length
    ? product.gallery[0].url
    : placeholderImage;

  return (
    <Link to={productActionRoutes.details(product)}>
      <article className="size-full overflow-hidden rounded-md border">
        <div className="aspect-h-1 aspect-w-1">
          <img
            src={image}
            alt="Product Image"
            className="size-full object-cover object-center"
          />
        </div>
        <div className="border-t p-2">
          <p className="font-semibold text-primary">
            {Formatter.currency(product.price)}
          </p>
          <h3 className="line-clamp-2 text-sm text-primary">{product.name}</h3>
        </div>
      </article>
    </Link>
  );
};

ProductCard.Skeleton = function ProductCardSkeleton() {
  return (
    <article className="size-full overflow-hidden rounded-md border">
      <Skeleton className="aspect-h-1 aspect-w-1 w-full rounded-none" />
      <div className="space-y-2 border-t p-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </article>
  );
};
