import { Button, Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";
import { getVisibleTotalCart } from "../../cart";

export const CartSummary = ({ cart }) => {
  const total = getVisibleTotalCart(cart);

  return (
    <div className="p-4">
      <div className="mb-1">
        <p className="text-lg font-medium leading-tight">Summary</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm leading-tight">Total</p>
        <p className="text-lg font-medium leading-tight">
          {Formatter.money(total)}
        </p>
      </div>
      <Button className="mt-2 w-full" size="lg" type="submit">
        Next
      </Button>
    </div>
  );
};

CartSummary.Skeleton = function CartSummarySkeleton() {
  return (
    <div className="p-4">
      <div className="mb-2">
        <p className="text-lg font-medium leading-tight">Summary</p>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
};
