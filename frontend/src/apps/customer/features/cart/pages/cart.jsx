import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import {
  useToast,
  Button,
  EmptyPlaceholder,
  Card,
  CardHeader,
  CardContent,
} from "../../../../../components";
import { CartItem } from "../components/cart-item/cart-item";
import { useClearCart, useGetCart } from "../queries";
import { CartSummary } from "../components/cart-summary/cart-summary";

const Cart = () => {
  const { toast } = useToast();
  const { data: cart, isLoading, isError, isSuccess } = useGetCart();
  const clearCart = useClearCart();

  const handleClearCart = () => {
    clearCart.mutate(undefined, {
      onSuccess() {
        toast({
          title: "Cart cleared",
          description: "Your cart has been cleared",
        });
      },
      onError(error) {
        toast({
          title: "Cart could not be cleared",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const hasContent = isSuccess && cart.length > 0;
  const isEmpty = isSuccess && cart.length === 0;

  return (
    <main className="container flex max-w-6xl flex-col">
      <section className="mt-3 justify-between sm:flex">
        <div className="scroll-m-20">
          <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
          <p className="mt-1 leading-tight text-muted-foreground">
            Explore and shop for your favorite items.
          </p>
        </div>
        <div className="mt-3 text-end sm:mt-1">
          <Button
            type="button"
            onClick={handleClearCart}
            disabled={clearCart.isLoading || isEmpty}
          >
            Clear cart
          </Button>
        </div>
      </section>

      {isLoading && (
        <section className="divide-y divide-black/10">
          <CartItem.Skeleton />
          <CartItem.Skeleton />
          <CartItem.Skeleton />
          <CartItem.Skeleton />
        </section>
      )}
      {isError && (
        <section>
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>Error fetching cart</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Please try again later.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        </section>
      )}
      {isEmpty && (
        <section>
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
            <EmptyPlaceholder.Title>Your cart is empty.</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Explore and shop for your favorite items.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        </section>
      )}
      {hasContent && (
        <>
          <section className="mt-4 flex gap-4">
            <div className="grow">
              <Card>
                <CardContent className="divide-y divide-black/10 p-0">
                  {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}

                  <CartSummary
                    cart={cart}
                    className="sticky bottom-0 mt-auto rounded-b-md p-4 sm:hidden"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="relative hidden max-w-sm grow sm:block">
              <Card className="sticky top-4">
                <CardHeader>
                  <CartSummary cart={cart} />
                </CardHeader>
              </Card>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Cart;
