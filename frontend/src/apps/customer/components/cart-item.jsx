import { cn } from "../../../libs/utils";
import { CartProduct } from "./cart-product";
import { CartToolbar } from "./cart-toolbar";

export const CartItem = ({ item, onProductLinkClick, className }) => {
  return (
    <article className={cn("space-y-2", className)}>
      <CartProduct item={item} onProductLinkClick={onProductLinkClick} />
      <CartToolbar item={item} />
    </article>
  );
};

CartItem.Skeleton = function CartItemSkeleton({ className }) {
  return (
    <article className={cn("space-y-2", className)}>
      <CartProduct.Skeleton />
      <CartToolbar.Skeleton />
    </article>
  );
};
