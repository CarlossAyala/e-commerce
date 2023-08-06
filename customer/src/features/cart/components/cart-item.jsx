import { useEffect, useState } from 'react';
import { useDebounce, useIsFirstRender } from '../../../utils/hooks';
import {
  useChangeVisibility,
  useRemoveFromCart,
  useUpdateItemCart,
} from '../cart.queries';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { IconButton, NumberInput } from '@carbon/react';
import { priceFormater } from '../../../utils/formater';
import { Close, View, ViewOff } from '@carbon/icons-react';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const firstRender = useIsFirstRender();
  const debouncedQuantity = useDebounce(quantity);

  const removeItem = useRemoveFromCart();
  const updateQty = useUpdateItemCart();
  const changeVis = useChangeVisibility();

  const changeVisibility = async () => {
    try {
      await changeVis.mutateAsync(item.id);
    } catch (error) {
      console.log('<CartItem />');
      console.log('changeVisibility', error);
    }
  };
  const handleRemoveItem = async () => {
    try {
      await removeItem.mutateAsync(item.id);
    } catch (error) {
      console.log('<CartItem />');
      console.log('handleRemoveItem', error);
    }
  };

  const handleUpdateQuantity = async (debounceQty) => {
    try {
      if (debounceQty < 1) return;
      else if (debounceQty > item.product.stock) return;
      else if (debounceQty === item.quantity) return;

      await updateQty.mutateAsync([item.id, debounceQty]);
    } catch (error) {
      console.log('<CartItem />');
      console.log('handleUpdateQuantity', error);
    }
  };

  useEffect(() => {
    if (firstRender) return;
    handleUpdateQuantity(debouncedQuantity);
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
          onClick={() => handleRemoveItem()}
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
      </div>
    </li>
  );
};

export default CartItem;
