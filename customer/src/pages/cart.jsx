import { Button } from '@carbon/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useGetCart,
  CartItem,
  CartItemSkeleton,
  getTotalsCart,
} from '../features/cart';
import { useCheckout } from '../features/checkout';
import { useCreatePaymentIntent } from '../features/stripe/payment-intent';
import { priceFormatter } from '../utils/formatter';

const Cart = () => {
  const navigate = useNavigate();

  const items = useGetCart();
  console.log('Products', items);

  const [visible, hidden, both] = getTotalsCart(items.data);

  // console.log('totalVisible', totalVisible);
  // console.log('hidden', hidden);
  // console.log('totalVisMoreHid', totalVisMoreHid);

  // console.log('Re render');

  const { setPaymentIntent } = useCheckout();
  const createPaymentIntent = useCreatePaymentIntent();

  const handleCheckout = async () => {
    try {
      const paymentIntent = await createPaymentIntent.mutateAsync();
      console.log('Payment Intent Created!', paymentIntent);

      setPaymentIntent(paymentIntent.id);
      navigate('/checkout/shipping');
    } catch (error) {
      console.log('Cart handleCheckout', error);
    }
  };

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>My Cart</h1>
      </section>

      {items.isLoading && (
        <section className='space-y-10 p-4'>
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </section>
      )}

      {items.isFetched && items.data?.length === 0 ? (
        <section className='px-4 py-10'>
          <p className='mb-1 text-base font-semibold leading-tight'>
            Your cart is empty
          </p>
          <p className='mb-2 text-sm leading-tight tracking-wide text-gray-600'>
            Start adding items to your cart
          </p>
          <Link to='/' className='text-lg'>
            Explore now
          </Link>
        </section>
      ) : null}

      {items.isFetched && items.data?.length > 0 ? (
        <>
          <section className='overflow-y-auto p-4'>
            <ul className='space-y-10'>
              {items.data.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.quantity}`}
                  item={item}
                />
              ))}
            </ul>
          </section>
          <div className='sticky bottom-0 z-10 mt-auto w-full border-t border-gray-300 bg-white p-4'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-base leading-none text-gray-600'>
                  Subtotal
                </span>
                <span className='text-xl font-semibold leading-none'>
                  {priceFormatter(visible)}
                </span>
              </div>
              {hidden > 0 && (
                <div className='flex items-center justify-between'>
                  <span className='text-base leading-none text-gray-600'>
                    Total + Hidden
                  </span>
                  <span className='text-xl font-semibold leading-none'>
                    {priceFormatter(both)}
                  </span>
                </div>
              )}
            </div>
            <div className='mb-3 mt-0.5'>
              <p className='text-sm text-gray-500'>
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <div className='flex w-full'>
              <Button
                onClick={handleCheckout}
                style={{ width: '100%', maxWidth: '100%' }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
};

export default Cart;
