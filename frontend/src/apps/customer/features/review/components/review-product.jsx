import { Link } from "react-router-dom";
import { cn } from "@/libs";
import { Skeleton } from "@/components";
import { productActionRoutes } from "../../product";

export const ReviewProduct = ({ className, product }) => {
  return (
    <article className={cn("flex gap-4 p-4", className)}>
      <img
        className="size-14 shrink-0 rounded-md border border-black/10 object-contain"
        src="https://http2.mlstatic.com/D_NQ_NP_615787-MLA53225354281_012023-O.webp"
        alt={`Profile ${product.name}`}
      />
      <div className="grow text-sm">
        <Link
          to={productActionRoutes.details(product)}
          target="_blank"
          className="truncate font-medium hover:underline"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-muted-foreground">
          {product.description}
        </p>
      </div>
    </article>
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
