import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { EmptyState, Spinner } from "@/shared/components";
import { Formatter } from "@/shared/utils";
import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  Skeleton,
} from "@/shared/components";
import {
  checkoutActionRoutes,
  useCreatePaymentIntent,
} from "../features/checkout";
import { calculateTotal, useGetCart } from "../features/cart";
import { CartItem } from "./cart-item";

export const UserCart = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: cart, isLoading, isError, error } = useGetCart();
  const checkout = useCreatePaymentIntent();

  const handleCheckout = () => {
    checkout.mutate(null, {
      onSuccess({ id }) {
        setOpen(false);
        navigate(checkoutActionRoutes.shipping(id));
      },
      onSettled() {
        checkout.reset();
      },
    });
  };

  const subTotal = calculateTotal(cart || []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-9 px-1">
          <ShoppingBagIcon className="mr-1 size-5" />
          <p className="text-sm font-normal lining-nums">
            {isLoading ? (
              <Spinner className="size-3.5" />
            ) : isError ? (
              "!"
            ) : (
              cart.length
            )}
          </p>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col gap-0 p-0 shadow-xl sm:max-w-sm">
        <div className="px-4 pt-4">
          <h2 className="text-lg font-medium">Shopping Cart</h2>
        </div>

        {isLoading ? (
          <div className="flex flex-1 flex-col justify-between overflow-y-auto">
            <ul className="divide-y divide-gray-200 px-4">
              {new Array(3).fill(0).map((_, index) => (
                <li key={index} className="py-4">
                  <CartItem.Skeleton />
                </li>
              ))}
            </ul>

            <div className="sticky bottom-0 space-y-2 border-t border-gray-200 bg-white p-4">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : isError ? (
          <EmptyState
            className="flex-1 border-0"
            title="Error"
            description={error.message}
          />
        ) : !cart.length ? (
          <EmptyState
            className="flex-1 border-0"
            title="No products"
            description="Explore and shop for your favorite items."
          >
            <Button onClick={() => setOpen(false)}>Explore</Button>
          </EmptyState>
        ) : (
          <div className="flex flex-1 flex-col justify-between overflow-y-auto">
            <ul className="divide-y divide-gray-200 px-4">
              {cart.map((item, index) => (
                <li key={index} className="py-4">
                  <CartItem item={item} />
                </li>
              ))}
            </ul>

            <div className="sticky bottom-0 space-y-2 border-t bg-background p-4">
              <div className="flex items-center justify-between gap-2 font-medium">
                <p>Subtotal</p>
                <p>{Formatter.currency(subTotal)}</p>
              </div>

              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full text-base"
                disabled={checkout.isLoading}
              >
                {checkout.isLoading && <Spinner className="mr-2 size-4" />}
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
