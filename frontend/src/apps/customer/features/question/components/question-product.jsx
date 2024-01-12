import { Link } from "react-router-dom";
import { Skeleton } from "../../../../../components";
import { productActionRoutes } from "../../product";
import { Formatter } from "../../../../../utils/formatter";

export const QuestionProduct = ({ product }) => {
  return (
    <div className="flex gap-4 p-4">
      <img
        className="h-14 w-14 shrink-0 rounded-md border border-black/10 object-contain"
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
        <p className="text-xs leading-tight text-muted-foreground">
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
    <div className="flex gap-4 px-4 py-3">
      <Skeleton className="h-14 w-14 shrink-0" />
      <div className="grow space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};
