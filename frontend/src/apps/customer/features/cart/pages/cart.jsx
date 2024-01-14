import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  useToast,
  Button,
  EmptyPlaceholder,
  Card,
  CardContent,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from "../../../../../components";
import { CartItem } from "../components/cart-item";
import { useClearCart, useGetCart } from "../queries";
import { CartSummary } from "../components/cart-summary";

const Cart = () => {
  const { toast } = useToast();
  const { data: cart, isLoading, isError, isSuccess, error } = useGetCart();

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

  const isEmpty = isSuccess && cart.length === 0;

  return (
    <main className="container flex max-w-6xl flex-col space-y-4">
      <section className="mt-3 flex gap-4">
        <div className="scroll-m-20">
          <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
          <p className="mt-1 leading-tight text-muted-foreground">
            Explore and shop for your favorite items.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto shrink-0" size="icon">
              <EllipsisVerticalIcon className="h-5 w-5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onSelect={handleClearCart}
              disabled={clearCart.isLoading || isEmpty || isError}
            >
              Clear cart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {isLoading ? (
        <section className="flex content-start gap-4">
          <Card className="w-full">
            <CardContent className="divide-y divide-black/10 p-0">
              <CartItem.Skeleton />
              <CartItem.Skeleton />
              <CartItem.Skeleton />

              <div className="overflow-hidden rounded-b-md sm:hidden">
                <CartSummary.Skeleton />
              </div>
            </CardContent>
          </Card>

          <div className="hidden w-full max-w-sm grow sm:block">
            <Card className="overflow-hidden">
              <CartSummary.Skeleton />
            </Card>
          </div>
        </section>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="Your cart is empty"
          description="Explore and shop for your favorite items."
        />
      ) : (
        <section className="mt-4 flex gap-4">
          <div className="grow">
            <Card className="divide-y divide-black/10">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              <div className="sticky bottom-0 mt-auto rounded-b-md sm:hidden">
                <CartSummary cart={cart} />
              </div>
            </Card>
          </div>

          <div className="relative hidden max-w-sm grow sm:block">
            <Card className="sticky top-4 overflow-hidden">
              <CartSummary cart={cart} />
            </Card>
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
