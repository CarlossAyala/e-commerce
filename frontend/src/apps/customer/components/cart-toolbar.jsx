import { Skeleton } from "@/components";
import { CartToolbarBookmark } from "./cart-toolbar-bookmark";
import { CartToolbarQuantity } from "./cart-toolbar-quantity";
import { CartToolbarRemove } from "./cart-toolbar-remove";
import { CartToolbarView } from "./cart-toolbar-view";

export const CartToolbar = ({ item }) => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-between gap-2 text-gray-600">
        <CartToolbarBookmark item={item} />
        <CartToolbarView item={item} />
        <CartToolbarRemove item={item} />
      </div>
      <CartToolbarQuantity key={item.quantity} item={item} />
    </div>
  );
};

CartToolbar.Skeleton = function CartToolbarSkeleton() {
  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
      </div>
      <Skeleton className="h-8 w-32" />
    </div>
  );
};
