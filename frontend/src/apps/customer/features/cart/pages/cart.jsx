import { useDocumentTitle } from "@/shared/hooks";
import { CartItem } from "@/apps/customer/components";
import { CartSummary } from "@/apps/customer/components/cart-summary";
import { EmptyPlaceholder } from "@/components";
import { useGetCart } from "../queries";

export const Cart = () => {
  useDocumentTitle("Cart");
  const { data: cart, isLoading, isError, error } = useGetCart();

  const isEmpty = cart?.length === 0;

  return (
    <main className="container flex max-w-6xl flex-1 flex-col space-y-6">
      <section className="mt-4">
        <h2 className="text-3xl font-semibold tracking-tight">Cart</h2>
        <p className="leading-tight text-muted-foreground">
          Explore and shop for your favorite items.
        </p>
      </section>

      {isLoading ? (
        <section className="grid-cols-8 gap-6 md:grid">
          <ul className="grid divide-y divide-gray-200 rounded-lg border border-gray-200 md:col-span-5">
            {new Array(3).fill("").map((_, index) => (
              <li key={index}>
                <CartItem.Skeleton className="p-4" />
              </li>
            ))}
          </ul>

          <div className="mt-6 md:col-span-3 md:mt-0">
            <CartSummary.Skeleton />
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
        <section className="grid-cols-8 gap-6 md:grid">
          <div className="md:col-span-5">
            <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
              {cart.map((item, index) => (
                <li key={index}>
                  <CartItem item={item} className="p-4" />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-2 md:col-span-3 md:mt-0">
            <CartSummary />

            <ul className="list-inside list-square text-sm text-muted-foreground">
              <li>
                The hidden products are used to see what the Cart would look
                like if they are deleted.
              </li>
            </ul>
          </div>
        </section>
      )}
    </main>
  );
};
