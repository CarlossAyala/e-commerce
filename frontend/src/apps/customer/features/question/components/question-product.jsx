import { Link } from "react-router-dom";
import { Skeleton } from "../../../../../components";
import { productActionRoutes } from "../../product";
import { Formatter } from "../../../../../utils/formatter";

//TODO: Replace src with product's image
export const QuestionProduct = ({ product }) => {
  return (
    <div className="flex gap-2 px-4 py-2">
      <img
        className="size-10 shrink-0 rounded-md border border-black/10 object-contain"
        src="https://http2.mlstatic.com/D_NQ_NP_615787-MLA53225354281_012023-O.webp"
        alt={`Profile ${product.name}`}
      />
      <div className="grow leading-tight">
        <Link
          to={productActionRoutes.detail(product.id, product.slug)}
          target="_blank"
          className="line-clamp-1 text-sm hover:underline"
        >
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">
          <span className="capitalize">{product.condition}</span>
          {" - "}
          <span>U.P {Formatter.currency(product.price)}</span>
          {" - "}
          <span>{product.available ? "Available" : "Unavailable"}</span>
        </p>
      </div>
    </div>
  );
};

QuestionProduct.Skeleton = function QuestionProductSkeleton() {
  return (
    <div className="flex gap-2 px-4 py-2">
      <Skeleton className="size-10 shrink-0" />
      <div className="flex grow flex-col justify-between">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};
