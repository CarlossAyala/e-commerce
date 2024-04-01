import { Link, useParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState } from "@/shared/components";
import { Separator, Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { OrderProduct, orderActionRoutes, useGetOrder } from "../../order";
import { useCleanUpCheckout } from "../queries";

export const CheckoutDetails = () => {
  useDocumentTitle("Checkout - Details");

  const { orderId } = useParams();
  const { data: details, isLoading, isError, error } = useGetOrder(orderId);
  useCleanUpCheckout();

  return (
    <main className="container flex-1 pb-10">
      {isLoading ? (
        <section className="mx-auto mt-4 max-w-xl space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {new Array(2).fill(0).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

          <div className="divide-y border-y">
            {new Array(3).fill(0).map((_, index) => (
              <div key={index} className="py-4">
                <OrderProduct.Skeleton />
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </section>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : (
        <section className="mx-auto mt-4 max-w-xl space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-indigo-600">
              Payment successful
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Thanks for ordering
            </h2>
            <p className="text-base text-muted-foreground">
              {"We appreciate your order, we're currently processing it."}
            </p>
          </div>

          <dl className="space-y-1 text-sm font-medium">
            <dt className="text-primary">Tracking ID</dt>
            <dd className="text-indigo-600">{details.order.id}</dd>
          </dl>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <dt className="font-medium text-primary">Shipping Address</dt>
              <dd className="text-muted-foreground">
                <address className="not-italic">
                  <p>{details.address.street}</p>
                  <p>
                    {details.address.province} ({details.address.zipCode}),{" "}
                    {details.address.city}
                  </p>
                  <p>Indications: {details.address.indications}</p>
                </address>
              </dd>
            </div>

            <div className="space-y-2">
              <dt className="font-medium text-primary">Payment Information</dt>
              <dd className="text-muted-foreground">
                <p className="capitalize">{details.paymentMethod.card.brand}</p>
                <p>Ending with {details.paymentMethod.card.last4}</p>
                <p>
                  Expires {details.paymentMethod.card.exp_month} /{" "}
                  {details.paymentMethod.card.exp_year}
                </p>
              </dd>
            </div>
          </dl>

          <ul role="list" className="divide-y border-y">
            {details.items.map((item) => (
              <li key={item.productId} className="py-4">
                <OrderProduct item={item} />
              </li>
            ))}
          </ul>

          <dl className="flex justify-between text-base font-medium text-primary">
            <dt>Total</dt>
            <dd>{Formatter.currency(details.order.total)}</dd>
          </dl>

          <Separator />

          <div className="flex justify-between text-sm">
            <Link className="text-indigo-600" to="/">
              Continue Shopping
            </Link>
            <Link
              className="text-indigo-600"
              to={orderActionRoutes.details(orderId)}
            >
              View Order
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};
