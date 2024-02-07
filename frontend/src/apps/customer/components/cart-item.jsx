import { cn } from "../../../libs/utils";
import { CartProduct } from "./cart-product";
import { CartToolbarBookmark } from "./cart-toolbar-bookmark";
import { CartToolbarQuantity } from "./cart-toolbar-quantity";
import { CartToolbarRemove } from "./cart-toolbar-remove";
import { CartToolbarView } from "./cart-toolbar-view";

export const CartItem = ({ item, onProductLinkClick, className }) => {
  return (
    <article
      className={cn("space-y-2", !item.visible && "opacity-50", className)}
    >
      <CartProduct item={item} onProductLinkClick={onProductLinkClick} />
      <div className="flex justify-between">
        <div className="flex justify-between gap-2 text-gray-600">
          <CartToolbarBookmark item={item} />
          <CartToolbarView item={item} />
          <CartToolbarRemove item={item} />
        </div>
        <CartToolbarQuantity item={item} />
      </div>
    </article>
  );
};
