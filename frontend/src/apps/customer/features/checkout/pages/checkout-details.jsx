import { Link, useParams } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { orderActionRoutes, useGetOrder } from "../../order";
import {
  EmptyPlaceholder,
  Skeleton,
  buttonVariants,
} from "../../../../../components";
import { useCleanUpCheckout } from "../queries";
import { Formatter } from "../../../../../utils";
import { OrderProduct } from "../../order";
import { cn } from "../../../../../libs/utils";
import { useDocumentTitle } from "../../../../../hooks";

export const CheckoutDetails = () => {
  const { orderId } = useParams();
  const { details, isLoading, isError, error } = useGetOrder(orderId);
  useCleanUpCheckout();
  useDocumentTitle("Checkout - Details");

  return (
    <main className="container flex-1 py-4">
      <section className="mx-auto max-w-md space-y-4">
        {isLoading ? (
          <>
            <div className="space-y-2">
              <Skeleton className="mx-auto size-14 rounded-full" />
              <Skeleton className="mx-auto h-8 w-3/4" />
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow">
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>

              <div className="space-y-2 border-y border-gray-200 py-4">
                <OrderProduct.Skeleton />
                <OrderProduct.Skeleton />
                <OrderProduct.Skeleton />
              </div>

              <div className="flex justify-between gap-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            </div>
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : (
          <>
            <div>
              <CheckCircleIcon className="mx-auto size-14 text-emerald-600" />
              <h2 className="text-center text-3xl font-medium">
                Order placed successfully!
              </h2>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow">
              <div className="space-y-1">
                <p className="font-medium">Order</p>
                <ul className="text-gray-600">
                  <li>ID: {orderId}</li>
                  <li className="capitalize">
                    Date: {Formatter.monthAndYearDate(details.order.orderedAt)}
                  </li>
                  <li className="capitalize">Status: {details.order.status}</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-medium">Shipping</p>
                <ul className="text-gray-600">
                  <li>{details.order.street}</li>
                  <li>
                    {details.order.province} ({details.order.zipCode}),{" "}
                    {details.order.city}
                  </li>
                  <li>Indications: {details.order.indications}</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-medium">Payment</p>
                <ul className="text-gray-600">
                  <li className="capitalize">
                    {details.paymentMethod.card.brand}{" "}
                    {details.paymentMethod.card.funding} {" **** "}
                    {details.paymentMethod.card.last4}
                  </li>
                </ul>
              </div>

              <ul className="border-y border-gray-200 py-4">
                {details.items.map((item, index) => (
                  <li key={index} className="py-2">
                    <OrderProduct item={item} />
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between font-medium">
                <p>Total</p>
                <p className="text-lg">
                  {Formatter.currency(details.order.total)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
                to={orderActionRoutes.details(orderId)}
              >
                View full details
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full",
                )}
                to="/customer"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
};
