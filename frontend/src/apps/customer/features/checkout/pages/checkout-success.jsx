import { useEffect } from "react";
import { Button, EmptyPlaceholder } from "../../../../../components";
import { useResetCheckoutStore } from "../stores";
import { Link, useParams } from "react-router-dom";
import { orderActionRoutes, useGetOrder } from "../../order";
import { Formatter } from "../../../../../utils/formatter";
import { OrderDetailSkeleton } from "../components/order-detail-skeleton";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

const CheckoutSuccess = () => {
  const { orderId } = useParams();
  const resetCheckoutStore = useResetCheckoutStore();

  const order = useGetOrder(orderId);

  useEffect(() => {
    resetCheckoutStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container max-w-4xl space-y-6">
      <section className="mt-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Checkout - Success
        </h1>
        {order.isSuccess && (
          <p className="mt-1 leading-tight">Thank you for your order!</p>
        )}
      </section>

      <section className="space-y-6">
        {order.isLoading && (
          <div className="grid gap-4 sm:grid-cols-3">
            <OrderDetailSkeleton />
            <OrderDetailSkeleton />
            <OrderDetailSkeleton />
          </div>
        )}
        {order.isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              {order.error?.message ?? "Something went wrong"}
            </EmptyPlaceholder.Title>
          </EmptyPlaceholder>
        )}
        {order.isSuccess && (
          <>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-semibold leading-6">
                  Shipping Address
                </dt>
                <dd className="mt-1 text-sm font-normal leading-tight text-muted-foreground">
                  <p>{order.data.order.street}</p>
                  <p>
                    {order.data.order.province} ({order.data.order.zipCode}),{" "}
                    {order.data.order.city}
                  </p>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6">
                  Payment Method
                </dt>
                <dd className="mt-1 text-sm font-normal leading-tight text-muted-foreground">
                  <p className="uppercase">
                    {order.data.paymentMethod.billing_details.name}
                  </p>
                  <p className="capitalize">
                    <span>{order.data.paymentMethod.card.brand}</span>
                    {" - "}
                    <span>{order.data.paymentMethod.card.last4}</span>
                    {" - "}
                    <span>
                      {order.data.paymentMethod.card.exp_month}/
                      {order.data.paymentMethod.card.exp_year}
                    </span>
                  </p>
                  <p></p>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6">Summary</dt>
                <dd className="mt-1 text-sm font-normal leading-tight text-muted-foreground">
                  <p className="text-3xl leading-6">
                    {Formatter.money(order.data.order.total)}
                  </p>
                </dd>
              </div>
            </dl>

            <div>
              <Button asChild>
                <Link to={orderActionRoutes.order(orderId)}>
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

export default CheckoutSuccess;
