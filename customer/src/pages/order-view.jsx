import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, SkeletonText, SkeletonPlaceholder } from '@carbon/react';
import { dateFormater, priceFormater } from '../utils/formater';
import { useGetOrder } from '../features/order/order.queries';

const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = useGetOrder(id);
  console.log('Order', order);

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Purchase Order</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          View
        </h2>
      </section>

      {order.isLoading && (
        <div className='p-4'>
          <div className='mb-4 w-1/3'>
            <SkeletonText />
          </div>
          <div className='space-y-4'>
            <CartItemSkeleton />
            <CartItemSkeleton />
            <CartItemSkeleton />
          </div>
        </div>
      )}

      {order.isFetched && !order.data ? (
        <div className='mt-4 p-4'>
          <p className='mb-0.5 text-base font-semibold text-gray-900'>
            You don&apos;t have any addresses yet.
          </p>
          <p className='text-sm leading-none text-gray-600'>
            Please add one to continue.
          </p>
          <Link
            to='/account/address/new'
            state={{ from: '/checkout/shipping' }}
            className='mt-2 inline-block'
          >
            <Button size='md'>Add Address</Button>
          </Link>
        </div>
      ) : null}

      {order.isFetched && order.data ? (
        <section className='space-y-4 p-4'>
          <div>
            <h3 className='mb-2 text-lg font-semibold leading-tight text-gray-900'>
              Products
            </h3>
            <ul className='space-y-4'>
              {order.data.orderItems.map((item) => (
                <li key={item.id}>
                  <Link to={`/product/${item.product.id}/${item.product.slug}`}>
                    <div className='flex w-full'>
                      <img
                        className='h-20 w-20'
                        src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
                        alt='Img Example'
                      />
                      <div className='ml-2 grow'>
                        <h4 className='mb-1 line-clamp-2 text-base font-semibold leading-tight text-gray-900'>
                          {item.product.name}
                        </h4>
                        <p className='text-sm leading-tight text-gray-600'>
                          Price: {priceFormater(item.product.price)}
                        </p>
                        <p className='text-sm leading-tight text-gray-600'>
                          Quantity: {item.quantity}
                        </p>
                        <p className='text-sm leading-tight text-gray-600'>
                          Total:{' '}
                          {priceFormater(item.quantity * item.product.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-2 text-lg font-semibold leading-tight text-gray-900'>
              Summary
            </h3>
            <div className='flex items-center justify-between'>
              <h4 className='text-sm font-medium leading-tight text-gray-600'>
                Sub total
              </h4>
              <p className='text-base font-semibold leading-tight text-gray-900'>
                {priceFormater(order.data.order.total)}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <h4 className='text-sm font-medium leading-tight text-gray-600'>
                Shipping Charge
              </h4>
              <p className='text-base font-semibold leading-tight text-gray-900'>
                {priceFormater(order.data.order.total)}
              </p>
            </div>
            <div className='mt-1 flex items-center justify-between'>
              <h4 className='text-lg font-medium leading-tight text-gray-600'>
                Total
              </h4>
              <p className='text-xl font-semibold leading-tight text-gray-900'>
                {priceFormater(order.data.order.total)}
              </p>
            </div>
          </div>

          <div>
            <h3 className='mb-2 text-lg font-semibold leading-tight text-gray-900'>
              Delivery
            </h3>
            <div className='space-y-2'>
              <div>
                <h4 className='text-sm font-medium leading-tight text-gray-500'>
                  Destinatary
                </h4>
                <p className='text-base leading-tight text-gray-800'>
                  {order.data.order.destinataire}
                </p>
              </div>
              <div>
                <h4 className='text-sm font-medium leading-tight text-gray-500'>
                  Address
                </h4>
                <p className='text-base leading-tight text-gray-800'>
                  {order.data.order.address}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold leading-tight text-gray-900'>
              Payment
            </h3>
            <div className='mt-2'>
              <p className='text-lg capitalize leading-normal text-gray-900'>
                {order.data.paymentMethod.card.brand}
              </p>
              <p className='text-sm leading-tight text-gray-800'>
                Finished at {order.data.paymentMethod.card.last4}
              </p>
              <p className='text-sm leading-tight text-gray-600'>
                Expires on {order.data.paymentMethod.card.exp_month}/
                {order.data.paymentMethod.card.exp_year}
              </p>
            </div>
          </div>

          <div>
            <h3 className='mb-2 text-lg font-semibold leading-tight text-gray-900'>
              About
            </h3>
            <div>
              <h4 className='text-sm font-medium leading-tight text-gray-500'>
                Order Date
              </h4>
              <p className='text-base capitalize leading-tight text-gray-800'>
                {dateFormater(order.data.order.orderedAt)}
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};

const CartItemSkeleton = () => {
  return (
    <div className='flex'>
      <SkeletonPlaceholder />
      <div className='ml-2 grow'>
        <div className='w-full'>
          <SkeletonText />
        </div>
        <div className='w-1/2'>
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </div>
      </div>
    </div>
  );
};

export default OrderView;
