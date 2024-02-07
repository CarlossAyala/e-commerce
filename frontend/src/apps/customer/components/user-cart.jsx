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
import { cartActionsRoutes, useGetCart } from "../features/cart";
import { Formatter } from "../../../utils";
import { CartItem } from "./cart-item";

export const UserCart = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const {
    cart,
    quantity,
    isLoading,
    isError,
    error,
    hasContent,
    subTotal,
    subTotalVisible,
    subTotalHidden,
  } = useGetCart();

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-9 p-0 px-1">
          <ShoppingBagIcon className="mr-1 size-5 text-black sm:size-6" />
          <span className="text-sm font-normal lining-nums text-black">
            {isLoading ? "--" : isError ? "!" : quantity}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full max-w-sm flex-col gap-0 overflow-y-scroll bg-white p-0 shadow-xl">
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
        ) : !hasContent ? (
          <EmptyPlaceholder
            className="flex-1 border-0"
            title="No products"
            description="Your cart is empty"
          >
            <Button className="mt-4" onClick={handleCloseModal}>
              Continue Shopping
            </Button>
          </EmptyPlaceholder>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <li key={index} className="py-4">
                    <CartItem
                      item={item}
                      onProductLinkClick={handleCloseModal}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto border-t border-gray-200 p-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2 font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{Formatter.currency(subTotalVisible)}</p>
                </div>

                <div className="flex items-center justify-between gap-2 text-sm text-gray-800">
                  <p className="leading-4">Hidden</p>
                  <p className="leading-4">
                    {Formatter.currency(subTotalHidden)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm text-gray-800">
                  <p className="leading-4">Hidden + Subtotal</p>
                  <p className="leading-4">{Formatter.currency(subTotal)}</p>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>

              <Button
                onClick={() => {
                  handleCloseModal();
                  navigate(cartActionsRoutes.root);
                }}
                className="mt-2 w-full"
                size="lg"
              >
                Cart
              </Button>
              <div className="mt-2 flex items-center justify-center gap-1 text-center text-sm text-gray-500">
                or
                <Button
                  variant="link"
                  className="inline-block h-auto w-auto gap-1 p-0"
                  onClick={handleCloseModal}
                >
                  Continue Shopping
                </Button>
                &rarr;
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
