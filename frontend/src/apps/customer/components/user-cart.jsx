import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  Button,
  EmptyPlaceholder,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../components";
import { calcSubTotal, cartActionsRoutes, useGetCart } from "../features/cart";
import { CartItem } from "./cart-item";

export const UserCart = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: cart, isLoading, isError, error } = useGetCart();

  const subTotal = calcSubTotal(cart);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-9 px-1">
          <ShoppingBagIcon className="mr-1 size-5" />
          <p className="text-sm font-normal lining-nums">
            {isLoading ? "--" : isError ? "!" : cart.length}
          </p>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col gap-0 bg-white p-0 shadow-xl sm:max-w-sm">
        <div className="space-y-1 border-b px-4 py-3">
          <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
        </div>

        {isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p>Loading</p>
          </div>
        ) : isError ? (
          <EmptyPlaceholder
            className="flex-1 border-0"
            title="Error"
            description={error.message}
          />
        ) : !cart.length ? (
          <EmptyPlaceholder
            className="flex-1 border-0"
            title="No products"
            description="Your cart is empty"
          >
            <Button className="mt-4" onClick={() => setOpen(false)}>
              Continue Shopping
            </Button>
          </EmptyPlaceholder>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <li key={index} className="relative py-4">
                    <CartItem
                      item={item}
                      onProductLinkClick={() => setOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto border-t border-gray-200 p-4">
              <div className="flex items-center justify-between gap-2 font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{subTotal}</p>
              </div>

              <Button
                onClick={() => {
                  setOpen(false);
                  navigate(cartActionsRoutes.root);
                }}
                className="mt-4 w-full text-base"
                size="lg"
              >
                Cart
              </Button>
              <div className="mt-2 flex items-center justify-center gap-1 text-center text-sm text-gray-500">
                or
                <Button
                  variant="link"
                  className="inline-block h-auto w-auto gap-1 p-0"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
