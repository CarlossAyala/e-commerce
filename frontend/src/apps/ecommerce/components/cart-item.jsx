import { Skeleton } from "@/shared/components";
import { ProductCardRow } from "./product-card-row";
import { CartItemPrice } from "./cart-item-price";
import { CartItemRemove } from "./cart-item-remove";
import { CartItemQty } from "./cart-item-qty";

export const CartItem = ({ item }) => {
  return (
    <section className="space-y-3">
      <ProductCardRow product={item.product} />
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <CartItemRemove productId={item.productId} />
          <CartItemQty item={item} />
        </div>
        <CartItemPrice item={item} />
      </div>
    </section>
  );
};

CartItem.Skeleton = function CartItemSkeleton() {
  return (
    <section className="space-y-3">
      <ProductCardRow.Skeleton />
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-7 w-1/4" />
      </div>
    </section>
  );
};
