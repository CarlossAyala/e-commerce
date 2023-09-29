import clsx from "clsx";
import { Link } from "react-router-dom";
import { Formatter } from "../../../../utils/formatter";
import { productActionRoutes } from "../../features/product/utils";
import { Skeleton } from "../../../../components/ui/skeleton";

export const ProductItem = ({ product }) => {
  return (
    <Link
      to={productActionRoutes.detail(product.id, product.slug)}
      className="block w-full overflow-hidden rounded-md border border-black/10 shadow"
    >
      <div className="h-36 w-full p-2">
        <img
          src="https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp"
          alt={`${product.name} image`}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="border-t border-black/10 p-2">
        <p className="text-base font-bold leading-snug text-black">
          {Formatter.money(product.price)}
        </p>
        <p
          className={clsx(
            "rounded-md text-sm font-semibold capitalize leading-snug",
            product.condition === "new" && "text-green-700",
            product.condition === "used" && "text-violet-700",
            product.condition === "reconditioned" && "text-blue-700",
          )}
        >
          {product.condition}
        </p>
        <p className="line-clamp-2 text-sm font-medium leading-snug text-black">
          {product.name}
        </p>
      </div>
    </Link>
  );
};

ProductItem.Skeleton = function ProductItemSkeleton() {
  return <Skeleton className="h-56 overflow-hidden rounded-md shadow-md" />;
};
