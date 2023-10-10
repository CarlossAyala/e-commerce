import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, SkeletonText } from "@carbon/react";
import { orderListDateFormater, priceFormatter } from "../utils/formatter";
import { useGetOrders } from "../features/order/order.queries";

const OrderList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const orders = useGetOrders(id);
  console.log("Orders", orders);

  return (
    <main className="flex w-full flex-col bg-white">
      <section className="border-b border-gray-200 px-4 pb-4 pt-3">
        <h1 className="text-2xl leading-none">Purchase Order</h1>
        <h2 className="mt-1 text-base leading-none tracking-wide text-gray-600">
          List
        </h2>
      </section>

      {orders.isLoading && (
        <div className="p-4">
          <div className="mb-4 w-1/3">
            <SkeletonText />
          </div>
          <div className="space-y-4">
            <CheckoutSuccessSkeleton />
            <CheckoutSuccessSkeleton />
          </div>
        </div>
      )}

      {orders.isFetched && !orders.data ? (
        <div className="mt-4">
          <p className="mb-0.5 text-base font-semibold text-gray-900">
            You don&apos;t have any addresses yet.
          </p>
          <p className="text-sm leading-none text-gray-600">
            Please add one to continue.
          </p>
          <Link
            to="/account/address/new"
            state={{ from: "/checkout/shipping" }}
            className="mt-2 inline-block"
          >
            <Button size="md">Add Address</Button>
          </Link>
        </div>
      ) : null}

      {orders.isSuccess && orders.data ? (
        <section className="p-2">
          <ol className="space-y-4">
            {orders.data.rows.map((order) => (
              <li key={order.id} className="border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-200 p-2">
                  <span className="text-sm capitalize text-gray-600">
                    {orderListDateFormater(order.orderedAt)}
                  </span>
                  <Link to={`/order/${order.id}/view`}>View Details</Link>
                </div>
                <div className="flex gap-x-2 p-2">
                  <div className="grid grid-cols-2 gap-px bg-gray-200 p-px">
                    <img
                      className="h-10 w-10"
                      src="https://http2.mlstatic.com/D_751939-MLA46221843872_052021-N.jpg"
                      alt="Img Example"
                    />
                    <img
                      className="h-10 w-10"
                      src="https://http2.mlstatic.com/D_751939-MLA46221843872_052021-N.jpg"
                      alt="Img Example"
                    />
                    <img
                      className="h-10 w-10"
                      src="https://http2.mlstatic.com/D_751939-MLA46221843872_052021-N.jpg"
                      alt="Img Example"
                    />
                    <div className="flex items-center justify-center text-lg text-black">
                      +3
                    </div>
                  </div>
                  <div className="grid grow grid-cols-2 gap-1">
                    <div className="col-span-2">
                      <p className="text-sm leading-snug text-gray-600">
                        Address
                      </p>
                      <p className="line-clamp-1 text-sm leading-snug text-gray-900">
                        {order.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm leading-snug text-gray-600">
                        Status
                      </p>
                      <p className="text-sm capitalize leading-snug text-gray-900">
                        {order.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm leading-snug text-gray-600">
                        Total
                      </p>
                      <p className="text-sm font-semibold capitalize leading-snug text-gray-900">
                        {priceFormatter(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </main>
  );
};

const CheckoutSuccessSkeleton = () => {
  return (
    <div>
      <div className="w-1/3">
        <SkeletonText />
      </div>
      <div>
        <SkeletonText style={{ margin: "0" }} />
      </div>
    </div>
  );
};

export default OrderList;
