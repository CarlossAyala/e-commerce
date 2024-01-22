import { useEffect } from "react";
import { Button, EmptyPlaceholder } from "../../../../../components";
import { Link, useParams } from "react-router-dom";
import { orderActionRoutes, useGetOrder } from "../../order";
import { Formatter } from "../../../../../utils/formatter";
import { OrderDetailSkeleton } from "../components/order-detail-skeleton";
import { useCheckout } from "../context";

export const CheckoutDetail = () => {
  const { orderId } = useParams();
  const { resetCheckout } = useCheckout();

  const { data: order, isLoading, isError, error } = useGetOrder(orderId);

  useEffect(() => {
    resetCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Order", order);

  return (
    <main className="container space-y-6">
      <section className="mt-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Checkout
        </h1>
      </section>

      <section className="space-y-6">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <OrderDetailSkeleton />
            <OrderDetailSkeleton />
            <OrderDetailSkeleton />
          </div>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : (
          <>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold leading-6">
                  Shipping Address
                </dt>
                <dd className="mt-1 text-sm font-normal leading-tight text-muted-foreground">
                  <p>{order.order.street}</p>
                  <p>
                    {order.order.province} ({order.order.zipCode}),{" "}
                    {order.order.city}
                  </p>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6">
                  Payment Method
                </dt>
                <dd className="mt-1 text-sm font-normal leading-tight text-muted-foreground">
                  <p className="uppercase">
                    {order.paymentMethod.billing_details.name}
                  </p>
                  <p className="capitalize">
                    <span>{order.paymentMethod.card.brand}</span>
                    {" - "}
                    <span>{order.paymentMethod.card.last4}</span>
                    {" - "}
                    <span>
                      {order.paymentMethod.card.exp_month}/
                      {order.paymentMethod.card.exp_year}
                    </span>
                  </p>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6">Summary</dt>
                <dd className="mt-1 text-sm font-normal leading-tight text-muted-foreground">
                  <p className="text-3xl leading-6">
                    {Formatter.currency(order.order.total)}
                  </p>
                </dd>
              </div>
            </dl>

            <div>
              <Button asChild>
                <Link to={orderActionRoutes.details(orderId)}>
                  View full details
                </Link>
              </Button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};
