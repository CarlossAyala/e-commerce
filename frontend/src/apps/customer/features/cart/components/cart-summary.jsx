import { useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Skeleton, useToast } from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";
import { checkoutActionRoutes, useCreateCheckout } from "../../checkout";

export const CartSummary = ({ cart }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const generatePaymentIntent = useCreateCheckout();

  const handleCheckout = () => {
    generatePaymentIntent.mutate(null, {
      onSuccess({ id }) {
        navigate(checkoutActionRoutes.shipping(id));
      },
      onError(error) {
        toast({
          title: "Error generating checkout",
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="w-full rounded-b-md bg-white p-4">
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
          {Formatter.currency(itemsVisible)}
        </p>
      </div>
      {itemsHidden > 0 && (
        <>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-sm leading-tight">Hidden</p>
            <p className="text-sm font-medium leading-tight">
              {Formatter.currency(itemsHidden)}
            </p>
          </div>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-sm leading-tight">SubTotal (w/hidden)</p>
            <p className="text-sm font-medium leading-tight">
              {Formatter.currency(both)}
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
        disabled={generatePaymentIntent.isLoading}
        onClick={handleCheckout}
      >
        {generatePaymentIntent.isLoading && (
          <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        Checkout
      </Button>
    </div>
  );
};

CartSummary.Skeleton = function CartSummarySkeleton() {
  return (
    <div className="space-y-4 bg-white p-4">
      <Skeleton className="h-5 w-1/3" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  );
};
