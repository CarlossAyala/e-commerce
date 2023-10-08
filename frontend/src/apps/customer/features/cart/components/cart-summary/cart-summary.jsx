import { useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, useToast } from "../../../../../../components";
import { cn } from "../../../../../../libs/utils";
import { Formatter } from "../../../../../../utils/formatter";
import {
  checkoutActionRoutes,
  useCreateCheckout,
  useUpdateCheckoutPaymentIntent,
} from "../../../checkout";
import { getQtyVisibleCart, getTotalCart } from "../../utils";

export const CartSummary = ({ cart, className }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const createPaymentIntent = useCreateCheckout();
  const updatePaymentIntent = useUpdateCheckoutPaymentIntent();

  const [itemsVisible, itemsHidden, both] = getTotalCart(cart);
  const productsQty = getQtyVisibleCart(cart);

  const handleCheckout = () => {
    createPaymentIntent.mutate(null, {
      onSuccess({ id }) {
        updatePaymentIntent(id);
        navigate(checkoutActionRoutes.shipping);
      },
      onError(error) {
        toast({
          title: "Checkout could not be completed",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  return (
    <div className={cn("w-full rounded-b-md bg-white", className)}>
      <div className="mb-1">
        <p className="text-lg font-medium leading-tight">Summary</p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-sm leading-tight">Products</p>
        <p className="text-base font-medium leading-tight">{productsQty}</p>
      </div>
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

      <Button
        className="w-full"
        size="lg"
        type="button"
        disabled={createPaymentIntent.isLoading}
        onClick={handleCheckout}
      >
        {createPaymentIntent.isLoading && (
          <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        Checkout
      </Button>
    </div>
  );
};
