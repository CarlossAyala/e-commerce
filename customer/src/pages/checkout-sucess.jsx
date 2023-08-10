import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, SkeletonText } from '@carbon/react';
import { priceFormatter } from '../utils/formatter';
import { useGetOrder } from '../features/order/order.queries';

const CheckoutSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = useGetOrder(id);
  console.log('Order', order);

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Checkout</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          Success
        </h2>
      </section>

      <section className='p-4'>
        {order.isLoading && (
          <div>
            <div className='mb-4 w-1/3'>
              <SkeletonText />
            </div>
            <div className='space-y-4'>
              <CheckoutSuccessSkeleton />
              <CheckoutSuccessSkeleton />
            </div>
          </div>
        )}

        {order.isFetched && !order.data ? (
          <div className='mt-4'>
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
          <section className=''>
            <h3 className='text-center text-lg leading-tight'>
              Thank you for your purchase!
            </h3>

            <div className='my-4 h-px bg-gray-200' />

            <div className='space-y-4'>
              <div>
                <h4 className='mb-2 text-lg font-semibold leading-tight text-gray-900'>
                  Delivery
                </h4>
                <div className='space-y-2'>
                  <div>
                    <h5 className='text-sm font-medium leading-tight text-gray-500'>
                      Destinatary
                    </h5>
                    <p className='text-base leading-tight text-gray-800'>
                      {order.data.order.destinataire}
                    </p>
                  </div>
                  <div>
                    <h5 className='text-sm font-medium leading-tight text-gray-500'>
                      Address
                    </h5>
                    <p className='text-base leading-tight text-gray-800'>
                      {order.data.order.address}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className='mb-2 text-lg font-semibold leading-tight text-gray-900'>
                  Summary
                </h4>
                <div className='flex justify-between'>
                  <h5 className='text-base font-medium leading-tight text-gray-600'>
                    Total
                  </h5>
                  <p className='text-lg font-semibold leading-tight text-gray-900'>
                    {priceFormatter(order.data.order.total)}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <Button
                onClick={() => navigate(`/order/${order.data.order.id}/view`)}
              >
                View order
              </Button>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
};

const CheckoutSuccessSkeleton = () => {
  return (
    <div>
      <div className='w-1/3'>
        <SkeletonText />
      </div>
      <div>
        <SkeletonText style={{ margin: '0' }} />
      </div>
    </div>
  );
};

export default CheckoutSuccess;
