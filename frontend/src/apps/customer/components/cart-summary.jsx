import { useNavigate } from "react-router-dom";
import { Button, Skeleton, Spinner } from "@/components";
import { useGetCart } from "../features/cart";
import { useCreateCheckout, checkoutActionRoutes } from "../features/checkout";

export const CartSummary = () => {
  const navigate = useNavigate();

  const { subTotal, subTotalHidden, subTotalPlusHidden } = useGetCart();

  const { mutate, reset, isLoading } = useCreateCheckout();

  const handleCheckout = () => {
    mutate(null, {
      onSuccess({ id }) {
        navigate(checkoutActionRoutes.shipping(id));
      },
      onSettled() {
        reset();
      },
    });
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <div>
        <div className="flex justify-between font-medium">
          <p>Subtotal</p>
          <p>{subTotal}</p>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <p>Hidden</p>
          <p>{subTotalHidden}</p>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <p>Hidden + Subtotal</p>
          <p>{subTotalPlusHidden}</p>
        </div>
      </div>

      <Button
        className="w-full text-base"
        size="lg"
        disabled={isLoading}
        onClick={handleCheckout}
      >
        {isLoading && <Spinner className="mr-2 size-4" />}
        Checkout
      </Button>
    </div>
  );
};

CartSummary.Skeleton = function CartSummarySkeleton() {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-4">
      <div className="space-y-2 ">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>

      <Skeleton className="h-10" />
    </div>
  );
};
