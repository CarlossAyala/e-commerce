import clsx from "clsx";
import { Link } from "react-router-dom";
import { productActionRoutes } from "../features/product";
import { Formatter } from "@/utils";
import { Skeleton } from "@/components";

export const ProductCard = ({ product }) => {
  return (
    <Link
      to={productActionRoutes.details(product)}
      className="block w-full overflow-hidden rounded-md border border-black/10"
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
          {Formatter.currency(product.price)}
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

ProductCard.Skeleton = function ProductCardSkeleton({ count = 3 }) {
  return (
    <section className="grid grid-cols-products gap-4">
      {new Array(count).fill("").map((_, index) => (
        <Skeleton key={index} className="h-52" />
      ))}
    </section>
  );
};
