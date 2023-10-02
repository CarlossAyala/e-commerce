import { Button } from "../../../../../../components";
import { cn } from "../../../../../../libs/utils";
import { Formatter } from "../../../../../../utils/formatter";
import { getTotalsCart } from "../../utils";

export const CartSummary = ({ cart, className }) => {
  const [itemsVisible, itemsHidden, both] = getTotalsCart(cart);

  return (
    <div className={cn("w-full rounded-b-md bg-white", className)}>
      <div className="flex items-end justify-between">
        <p className="text-sm leading-tight">Subtotal</p>
        <p className="text-lg font-medium leading-tight">
          {Formatter.money(itemsVisible)}
        </p>
      </div>
      {itemsHidden > 0 && (
        <>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-sm leading-tight">Hidden</p>
            <p className="text-sm font-medium leading-tight">
              {Formatter.money(itemsHidden)}
            </p>
          </div>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-sm leading-tight">SubTotal (w/hidden)</p>
            <p className="text-sm font-medium leading-tight">
              {Formatter.money(both)}
            </p>
          </div>
        </>
      )}
      <p className="mb-4 mt-2 text-sm leading-tight text-muted-foreground">
        Shipping and taxes calculated at checkout.
      </p>

      <Button className="w-full" size="lg" type="button">
        Checkout
      </Button>
    </div>
  );
};
