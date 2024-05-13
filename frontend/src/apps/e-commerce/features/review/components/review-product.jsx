import { Link } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { cn } from "@/libs";
import { Skeleton } from "@/components";
import { productActionRoutes } from "../../products";

export const ReviewProduct = ({ className, product }) => {
  const image = product.gallery.length ? product.gallery[0].url : placeholder;

  return (
    <Link to={productActionRoutes.details(product)} className="block">
      <article className={cn("flex gap-4 p-4", className)}>
        <img
          src={image}
          alt="Product profile"
          className="size-14 shrink-0 rounded-md border object-cover object-center"
        />
        <div className="grow text-sm">
          <p className="line-clamp-1 font-medium">{product.name}</p>
          <p className="line-clamp-2 text-muted-foreground">
            {product.description}
          </p>
        </div>
      </article>
    </Link>
  );
};

ReviewProduct.Skeleton = function ReviewProductSkeleton({ className }) {
  return (
    <article className={cn("flex gap-4 p-4", className)}>
      <Skeleton className="size-14 shrink-0" />
      <div className="grow space-y-1">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </article>
  );
};
