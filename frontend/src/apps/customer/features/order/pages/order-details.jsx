import { useParams } from "react-router-dom";
import { Card, EmptyPlaceholder } from "../../../../../components";
import { useGetOrder } from "../queries";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Formatter } from "../../../../../utils/formatter";
import { OrderProduct } from "../components/order-product";
import { OrderSummary } from "../components/order-summary";
import { OrderInformation } from "../components/order-information";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetOrder(orderId);

  return (
    <main className="container max-w-4xl space-y-4">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">
          Order Details
        </h2>
        <p className="text-muted-foreground">About this order.</p>
      </section>

      <section className="space-y-6">
        {isLoading && (
          <>
            <OrderInformation.Skeleton />
            <OrderInformation.Skeleton />
            <OrderInformation.Skeleton />
            <Card className="divide-y divide-black/10">
              <OrderProduct.Skeleton />
              <OrderProduct.Skeleton />
              <OrderProduct.Skeleton />
              <OrderSummary.Skeleton />
            </Card>
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching order
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isSuccess && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold leading-tight">
                Order Information
              </h3>
              <dl className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <dt className="text-base font-medium leading-tight">
                    General
                  </dt>
                  <div className="space-y-1">
                    <dd className="text-sm font-normal">
                      ID:{" "}
                      <span className="text-muted-foreground">
                        {order.order.id}
                      </span>
                    </dd>
                    <dd className="text-sm font-normal">
                      Status:{" "}
                      <span className="capitalize text-muted-foreground">
                        {order.order.status}
                      </span>
                    </dd>
                    <dd className="text-sm font-normal">
                      Date:{" "}
                      <span className="text-muted-foreground">
                        {Formatter.shortDate(order.order.orderedAt)}
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="space-y-2">
                  <dt className="text-base font-medium leading-tight">
                    Billing
                  </dt>
                  <div className="text-sm font-normal leading-tight text-muted-foreground">
                    <dd>{order.paymentMethod.billing_details.name}</dd>
                    <dd className="capitalize">
                      {order.paymentMethod.card.brand}{" "}
                      {order.paymentMethod.card.funding} {" **** "}
                      {order.paymentMethod.card.last4}
                    </dd>
                  </div>
                </div>

                <div className="space-y-2">
                  <dt className="text-base font-medium leading-tight">
                    Shipping
                  </dt>
                  <div className="text-sm font-normal leading-tight text-muted-foreground">
                    <dd>
                      {order.order.street} {order.order.apartmentNumber}
                    </dd>
                    {order.order.indications && (
                      <dd>Indications: {order.order.indications}</dd>
                    )}
                    <dd>
                      {order.order.province} ({order.order.zipCode}),{" "}
                      {order.order.city}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold leading-tight">
                Order Products
              </h3>
              <Card className="divide-y divide-black/10">
                {order.items.map((item) => (
                  <OrderProduct key={item.id} item={item} />
                ))}
                <OrderSummary order={order} />
              </Card>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default OrderDetails;
