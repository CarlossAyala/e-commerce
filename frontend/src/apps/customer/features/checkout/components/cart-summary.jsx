import { Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";
import { getQtyVisibleCart, getVisibleTotalCart } from "../../cart";

export const CartSummary = ({ children, cart }) => {
  const total = getVisibleTotalCart(cart);
  const qty = getQtyVisibleCart(cart);

  return (
    <div className="p-4">
      <div className="mb-1">
        <p className="text-lg font-medium leading-tight">Summary</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm leading-tight">Products</p>
        <p className="text-base font-medium leading-tight">{qty}</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm leading-tight">Total</p>
        <p className="text-lg font-medium leading-tight">
          {Formatter.money(total)}
        </p>
      </div>
      {children}
    </div>
  );
};

CartSummary.Skeleton = function CartSummarySkeleton() {
  return (
    <div className="p-4">
      <div className="mb-2">
        <Skeleton className="h-6 w-1/3" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
};
