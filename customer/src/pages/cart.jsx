import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  IconButton,
  NumberInput,
  SkeletonPlaceholder,
  SkeletonText,
} from '@carbon/react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import {
  totalVisibles,
  useChangeVisibility,
  useGetCart,
  useRemoveFromCart,
  useUpdateItemCart,
  totalHiddens,
} from '../features/cart';
import { priceFormater } from '../utils/formater';
import {
  BookmarkAdd,
  BookmarkFilled,
  Close,
  View,
  ViewOff,
} from '@carbon/icons-react';
import { useDebounce } from '../utils/hooks';
import { useAddBookmark, useRemoveBookmark } from '../features/bookmark';
import { useCheckout } from '../features/checkout';
import { useCreatePaymentIntent } from '../features/strapi/payment-intent';

const Cart = () => {
  const navigate = useNavigate();

  const items = useGetCart();
  // console.log('Products', items);

  const totalVisible = totalVisibles(items.data);
  const hiddens = totalHiddens(items.data);
  const totalVisMoreHid = totalVisible + hiddens;

  // console.log('totalVisible', totalVisible);
  // console.log('hiddens', hiddens);
  // console.log('totalVisMoreHid', totalVisMoreHid);

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
                <CartItem key={item.id} item={item} />
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
                  {priceFormater(totalVisible)}
                </span>
              </div>
              {hiddens > 0 && (
                <div className='flex items-center justify-between'>
                  <span className='text-base leading-none text-gray-600'>
                    Total + Hiddens
                  </span>
                  <span className='text-xl font-semibold leading-none'>
                    {priceFormater(totalVisMoreHid)}
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

const CartItemSkeleton = () => {
  return (
    <div className='flex'>
      <div className='mr-2'>
        <SkeletonPlaceholder />
      </div>
      <div className='flex flex-col justify-between'>
        <div>
          <div className='w-52'>
            <SkeletonText />
          </div>
          <div className='w-16'>
            <SkeletonText style={{ margin: '0' }} />
          </div>
        </div>
        <div className='w-20'>
          <SkeletonText style={{ margin: '0' }} />
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const debouncedQuantity = useDebounce(quantity);

  const removeFromCart = useRemoveFromCart();
  const updateQuantity = useUpdateItemCart();
  const changeVisible = useChangeVisibility();

  const addToBookmark = useAddBookmark();
  const removeFromBookmark = useRemoveBookmark();

  const changeVisibility = () => {
    changeVisible.mutate(item.id);
  };

  useEffect(() => {
    if (debouncedQuantity < 1) return;
    if (debouncedQuantity > item.product.stock) return;
    if (!item.product.available) return;

    if (debouncedQuantity !== item.quantity) {
      updateQuantity.mutate({
        id: item.id,
        quantity: debouncedQuantity,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuantity]);

  return (
    <li className={clsx(!item.visible && 'opacity-50')}>
      <div className='flex w-full'>
        <div className='h-20 w-20 shrink-0 overflow-hidden rounded'>
          <img
            src={
              item.product.image ||
              'https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
            }
            alt={item.product.name}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='ml-2 flex grow flex-col justify-between'>
          <div>
            <Link
              to={`/product/${item.product.id}/${item.product.slug}`}
              target='_blank'
            >
              <h3 className='mb-1 text-base font-semibold leading-tight'>
                {item.product.name}
              </h3>
            </Link>
            <div className='flex flex-wrap items-center divide-x divide-gray-300 text-sm leading-tight text-gray-500'>
              <span className='pr-2'>
                U.P: {priceFormater(item.product.price)}
              </span>
              <span className='pl-2'>Stock: {item.product.stock}</span>
            </div>
          </div>
          <p className='text-base font-semibold leading-tight text-gray-900'>
            {priceFormater(item.product.price * item.quantity)}
          </p>
        </div>
      </div>
      <div className='mt-3 flex gap-x-2'>
        <IconButton
          label='Remove item from cart'
          size='md'
          kind='secondary'
          onClick={() => removeFromCart.mutate(item.id)}
        >
          <Close size='20' />
        </IconButton>
        <NumberInput
          id={`item-quantity-${item.product.id}`}
          label='Quantity'
          name='quantity'
          hideLabel
          invalid={quantity > item.product.stock || !item.product.available}
          invalidText={
            quantity > item.product.stock
              ? 'Stock limit'
              : !item.product.available
              ? 'Product not available'
              : quantity < 1 && 'Quantity must be greater than 0'
          }
          max={item.product.stock}
          min={1}
          step={1}
          onChange={(_, { value }) => setQuantity(value)}
          value={quantity}
          size='md'
        />
        {item.visible ? (
          <IconButton
            onClick={() => changeVisibility()}
            label='Visible On'
            size='md'
            kind='secondary'
          >
            <View size='20' />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => changeVisibility()}
            label='Visible Off'
            size='md'
            kind='secondary'
          >
            <ViewOff size='20' />
          </IconButton>
        )}
        {item.product.inBookmark ? (
          <IconButton
            size='md'
            kind='secondary'
            label='Remove from bookmark'
            onClick={() => removeFromBookmark.mutate(item.product.id)}
          >
            <BookmarkFilled size='20' />
          </IconButton>
        ) : (
          <IconButton
            label='Add from bookmark'
            size='md'
            kind='secondary'
            onClick={() => addToBookmark.mutate(item.product.id)}
          >
            <BookmarkAdd size='20' />
          </IconButton>
        )}
      </div>
    </li>
  );
};

export default Cart;
