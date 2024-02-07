import { Link } from "react-router-dom";
import { productActionRoutes } from "../features/product";
import { cn } from "../../../libs/utils";
import { Formatter } from "../../../utils";

export const CartProduct = ({ item, onProductLinkClick }) => {
  return (
    <div className="flex gap-4">
      <div className="size-20 shrink-0 overflow-hidden rounded-md border">
        <img
          className="size-full object-contain"
          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
          alt="Some random alt"
        />
      </div>
      <div className="w-full space-y-1">
        <Link
          onClick={onProductLinkClick}
          to={productActionRoutes.detail(item.product)}
          className="line-clamp-2 font-medium leading-4 text-gray-800"
        >
          {item.product.name}
        </Link>

        <ul className="list-inside list-disc space-y-px text-sm leading-tight	text-gray-600">
          <li>{Formatter.currency(item.product.price)}</li>
          <li className={cn(item.product.stock === 0 && "text-red-600")}>
            {item.product.stock > 0
              ? `Stock ${item.product.stock}`
              : "Out of Stock"}
          </li>
          <li>
            <span
              className={cn(
                item.product.available ? "text-green-600" : "text-red-600",
              )}
            >
              {item.product.available ? "Available" : "Unavailable"}
            </span>
          </li>
        </ul>

        <p className="text-right font-medium leading-tight">
          {Formatter.currency(item.product.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};
