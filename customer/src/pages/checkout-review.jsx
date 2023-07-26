import { Link, useNavigate } from 'react-router-dom';
import { Button, SkeletonText, SkeletonPlaceholder } from '@carbon/react';
import { useGetAddress } from '../features/address';
import { priceFormater } from '../utils/formater';
import { useCheckout } from '../features/checkout';
import { useGetCart } from '../features/cart';
import { useGetPaymentMethod } from '../features/strapi/payment-method';
import { useConfirmPaymentIntent } from '../features/strapi/payment-intent';

const CheckoutReview = () => {
  const checkout = useCheckout();
  console.log('Checkout', checkout);

  const address = useGetAddress(checkout.address);
  const paymentMethod = useGetPaymentMethod(checkout.paymentMethod);
  const cart = useGetCart('only_visible=true');
  console.log('Address', address);
  console.log('PaymentMethod', paymentMethod);
  console.log('Cart', cart);

  const confirmPaymentIntent = useConfirmPaymentIntent();

  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const response = await confirmPaymentIntent.mutateAsync(checkout);
      console.log('CheckoutReview handleConfirm', response);

      navigate(`/checkout/success/${response.order}`, { replace: true });
    } catch (error) {
      console.log('CheckoutReview');
      console.log('CheckoutReview handleConfirm', error);
    }
  };

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Checkout</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          Review
        </h2>
      </section>

      <section className='p-4'>
        <h3 className='text-lg leading-tight'>
          Review and confirm your purchase
        </h3>

        {address.isLoading && (
          <div className='mt-4'>
            <div className='flex items-center justify-between'>
              <div className='w-1/4'>
                <SkeletonText />
              </div>
              <div className='w-1/4'>
                <SkeletonText />
              </div>
            </div>
            <AddressSkeleton />
          </div>
        )}
        {checkout.address === '' && (
          <section className='mt-4'>
            <div className='mb-2'>
              <p className='text-sm leading-none text-gray-600'>
                You must select an address
              </p>
            </div>
            <div className='border-2 border-red-400 bg-gray-100 p-4'>
              <p>Please select an address</p>
              <p className='text-sm text-gray-500'>
                To continue, select an address
              </p>
              <Link to='/checkout/shipping' className='mt-4 inline-block'>
                <Button size='md' kind='secondary'>
                  Go to shipping
                </Button>
              </Link>
            </div>
          </section>
        )}
        {address.isFetched && address.data ? (
          <section className='mt-4'>
            <div className='mb-2 flex items-center justify-between'>
              <p className='text-sm leading-none text-gray-500'>Destination</p>
              <Link to='/checkout/shipping' className='inline-block text-sm'>
                Change address
              </Link>
            </div>
            <div className='bg-gray-100 p-4'>
              <p className='text-sm font-semibold leading-tight text-gray-900'>
                {address.data.street}
              </p>
              <p className='text-sm text-gray-800'>{`${address.data.province} (${address.data.zipCode}) - ${address.data.city}`}</p>
              <p className='text-sm text-gray-600'>{`${address.data.name} - ${address.data.phone}`}</p>
            </div>
          </section>
        ) : null}

        {paymentMethod.isLoading && (
          <div className='mt-4'>
            <div className='flex items-center justify-between'>
              <div className='w-1/4'>
                <SkeletonText />
              </div>
              <div className='w-1/4'>
                <SkeletonText />
              </div>
            </div>
            <CardSkeleton />
          </div>
        )}
        {checkout.paymentMethod === '' && (
          <section className='mt-4'>
            <div className='mb-2'>
              <p className='text-sm leading-none text-gray-600'>
                You must select an card
              </p>
            </div>
            <div className='border-2 border-red-400 bg-gray-100 p-4'>
              <p>Please select an card</p>
              <p className='text-sm text-gray-500'>
                To continue, select an card
              </p>
              <Link to='/checkout/payment' className='mt-4 inline-block'>
                <Button size='md' kind='secondary'>
                  Go to payment
                </Button>
              </Link>
            </div>
          </section>
        )}
        {paymentMethod.isFetched && paymentMethod.data ? (
          <section className='mt-4'>
            <div className='mb-2 flex items-center justify-between'>
              <p className='text-sm leading-none text-gray-500'>Card details</p>
              <Link to='/checkout/payment' className='inline-block text-sm'>
                Change card
              </Link>
            </div>
            <div className='bg-gray-100 p-4'>
              <p className='text-lg font-semibold capitalize text-gray-900'>
                {paymentMethod.data.card.brand}
              </p>
              <p className='text-sm text-gray-800'>
                Finished at {paymentMethod.data.card.last4}
              </p>
              <p className='text-sm text-gray-600'>
                Expires on{' '}
                <span>
                  {paymentMethod.data.card.exp_month}/
                  {paymentMethod.data.card.exp_year}
                </span>
              </p>
            </div>
          </section>
        ) : null}

        {cart.isLoading && (
          <section className='mt-4'>
            <div className='flex items-center justify-between'>
              <div className='w-1/4'>
                <SkeletonText />
              </div>
              <div className='w-1/2'>
                <SkeletonText />
              </div>
            </div>
            <div className='space-y-2'>
              <CartItemSkeleton />
              <CartItemSkeleton />
              <CartItemSkeleton />
            </div>
          </section>
        )}
        {cart.isFetched && cart.data?.length === 0 && (
          <section className='mt-4'>
            <div className='mb-2'>
              <p className='text-sm leading-none text-gray-600'>Cart</p>
            </div>

            <div className='border-2 border-red-400 bg-gray-100 p-4'>
              <p className='leading-tight'>
                Add products to your cart or make them visible
              </p>
              <p className='mt-2 text-sm leading-tight text-gray-500'>
                Please do this before proceeding to confirm a purchase
              </p>
              <div className='mt-4 space-y-2'>
                <Link to='/cart' className='inline-block'>
                  <Button size='md' kind='secondary'>
                    Go to cart
                  </Button>
                </Link>
                <Link to='/' className='inline-block'>
                  <Button size='md' kind='secondary'>
                    Continue shopping
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
        {cart.isFetched && cart.data?.length > 0 ? (
          <section className='mt-4'>
            <div className='mb-2 flex items-center justify-between'>
              <p className='text-sm leading-none text-gray-500'>Cart</p>
              <div className='flex items-center gap-x-2'>
                <Link to='/' className='inline-block text-sm leading-none'>
                  Continue shopping
                </Link>
                <span className='leading-none'>or</span>
                <Link to='/cart' className='inline-block text-sm leading-none'>
                  Go to Cart
                </Link>
              </div>
            </div>
            <ol className='space-y-2'>
              {cart.data.map((item) => (
                <li key={item.id}>
                  <div className='flex w-full bg-gray-100 p-4'>
                    <div className='mr-4  h-14 w-14 shrink-0 overflow-hidden rounded'>
                      <img
                        src={
                          item.product.image ||
                          'https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
                        }
                        alt={item.product.name}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='flex grow flex-col justify-between'>
                      <Link
                        to={`/p/${item.product.id}/${item.product.slug}`}
                        target='_blank'
                      >
                        <h3 className='mb-1 text-base font-semibold leading-tight'>
                          {item.product.name}
                        </h3>
                      </Link>
                      <div className='space-x-4'>
                        <span className='text-base text-gray-800'>
                          x{item.quantity}
                        </span>
                        <span className='font-semibold text-gray-900'>
                          {priceFormater(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </section>

      <section className='sticky bottom-0 z-10 mt-auto w-full border-t-2 border-gray-200 bg-white p-4'>
        <div>
          <ol>
            <li className='flex items-center justify-between'>
              <span className='text-base font-medium leading-tight text-gray-600'>
                Productos
              </span>
              <span className='text-lg font-semibold leading-tight text-gray-900'>
                {priceFormater(Math.random() * 1_000_000)}
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-base font-medium leading-tight text-gray-600'>
                Envío
              </span>
              <span className='text-lg font-semibold leading-tight text-gray-900'>
                {priceFormater(Math.random() * 1000)}
              </span>
            </li>
          </ol>
          <div className='mt-4'>
            <Button
              size='lg'
              style={{
                width: '100%',
                maxWidth: '100%',
              }}
              onClick={handleConfirm}
            >
              Confirm purchase
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

const AddressSkeleton = () => {
  return (
    <div className='bg-gray-100 p-4'>
      <div>
        <SkeletonText />
      </div>
      <div className='w-2/3'>
        <SkeletonText />
      </div>
      <div className='w-1/3'>
        <SkeletonText style={{ margin: '0' }} />
      </div>
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <div className='bg-gray-100 p-4'>
      <div className='w-1/3'>
        <SkeletonText />
      </div>
      <div className='w-3/4'>
        <SkeletonText style={{ margin: '0' }} />
      </div>
    </div>
  );
};

const CartItemSkeleton = () => {
  return (
    <div className='flex bg-gray-100 p-4'>
      <div className='mr-4 h-14 w-14'>
        <SkeletonPlaceholder style={{ width: '100%', height: '100%' }} />
      </div>
      <div className='flex grow flex-col justify-between'>
        <div>
          <div className='w-full'>
            <SkeletonText />
          </div>
        </div>
        <div className='flex space-x-2'>
          <div className='w-1/3'>
            <SkeletonText style={{ margin: '0' }} />
          </div>
          <div className='w-1/3'>
            <SkeletonText style={{ margin: '0' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutReview;
