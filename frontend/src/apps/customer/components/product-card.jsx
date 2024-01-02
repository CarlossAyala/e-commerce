import clsx from "clsx";
import { Link } from "react-router-dom";
import { Formatter } from "../../../utils/formatter";
import { productActionRoutes } from "../features/product/utils";
import { Skeleton } from "../../../components/ui/skeleton";

export const ProductCard = ({ product }) => {
  return (
    <Link
      to={productActionRoutes.detail(product.id, product.slug)}
      className="block w-full overflow-hidden rounded-md border border-black/10 shadow-sm"
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
        <p className="line-clamp-2 text-sm font-normal leading-snug text-black">
          {product.name}
        </p>
      </div>
    </Link>
  );
};

ProductCard.Skeleton = function ProductCardSkeleton({ items = 6 }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
      {Array.from({ length: items }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-52 overflow-hidden rounded-md shadow-md"
        />
      ))}
    </div>
  );
};
