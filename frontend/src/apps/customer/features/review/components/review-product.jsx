import { Link } from "react-router-dom";
import { productActionRoutes } from "../../product";
import { Skeleton } from "../../../../../components";
import { cn } from "../../../../../libs/utils";

export const ReviewProduct = ({ className, product }) => {
  return (
    <article className={cn("flex gap-4 p-4", className)}>
      <img
        className="size-14 shrink-0 rounded-md border border-black/10 object-contain"
        src="https://http2.mlstatic.com/D_NQ_NP_615787-MLA53225354281_012023-O.webp"
        alt={`Profile ${product.name}`}
      />
      <div className="grow">
        <Link
          to={productActionRoutes.detail(product.id, product.slug)}
          target="_blank"
          className="line-clamp-1 text-base leading-tight hover:underline"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm leading-tight text-muted-foreground">
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
