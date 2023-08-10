import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  RadioTile,
  SkeletonText,
  TileGroup,
  InlineNotification,
} from '@carbon/react';
import { useCheckout } from '../features/checkout';
import { useGetAddresses } from '../features/address';
import { priceFormatter } from '../utils/formatter';

const CheckoutShipping = () => {
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const localtion = useLocation();

  const addresses = useGetAddresses();
  const { address, setAddress } = useCheckout();

  const onAddressChange = (value) => {
    setAddress(value);
    setSubmitted(true);
  };

  const handleNextStep = () => {
    if (address) {
      navigate('/checkout/payment');
      setSubmitted(true);
    } else {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const addressId = localtion.state?.addressId;
    // console.log('useEffect location addressId', addressId);
    if (addressId) {
      setAddress(localtion.state?.addressId);
      setSubmitted(true);
    }
  }, []);

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Checkout</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          Shipping
        </h2>
      </section>

      <section className='p-4'>
        <h3 className='text-lg leading-tight'>
          Where should we ship your order?
        </h3>

        {addresses.isFetched && submitted && !address ? (
          <InlineNotification
            aria-label='closes notification'
            title='You must select an address'
            subtitle='Please select one to continue.'
            className='mt-2'
            style={{ maxWidth: '100%' }}
          />
        ) : null}

        {addresses.isLoading && (
          <div className='mt-4'>
            <div className='flex items-center justify-between'>
              <div className='w-1/4'>
                <SkeletonText />
              </div>
              <div className='w-1/4'>
                <SkeletonText />
              </div>
            </div>
            <div className='space-y-2'>
              <AddressSkeleton />
              <AddressSkeleton />
              <AddressSkeleton />
            </div>
          </div>
        )}

        {addresses.isFetched && addresses.data?.length === 0 ? (
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

        {addresses.isFetched && addresses.data?.length > 0 ? (
          <section className='mt-4'>
            <div className='mb-2 flex items-center justify-between'>
              <p className='text-sm leading-none text-gray-500'>
                Select a destination
              </p>
              <Link
                to='/account/address/new'
                state={{ from: '/checkout/shipping' }}
                className='inline-block text-sm'
              >
                Add Address
              </Link>
            </div>
            <TileGroup
              name='addresses'
              defaultSelected={address}
              onChange={onAddressChange}
              valueSelected={address}
            >
              {addresses.data.map((address, index) => (
                <RadioTile
                  key={address.id}
                  id={address.id}
                  name='address'
                  tabIndex={index}
                  value={address.id}
                  className={index !== addresses.data.length - 1 ? 'mb-2' : ''}
                >
                  <p className='text-sm font-semibold leading-tight text-gray-900'>
                    {address.street}
                  </p>
                  <p className='text-sm text-gray-800'>{`${address.province} (${address.zipCode}) - ${address.city}`}</p>
                  <p className='text-sm text-gray-600'>{`${address.name} - ${address.phone}`}</p>
                </RadioTile>
              ))}
            </TileGroup>
          </section>
        ) : null}
      </section>

      <section className='sticky bottom-0 z-10 mt-auto w-full border-t border-gray-300 bg-white p-4'>
        <div>
          <ol>
            <li className='flex items-center justify-between'>
              <span className='text-base font-medium leading-tight text-gray-600'>
                Productos
              </span>
              <span className='text-lg font-semibold leading-tight text-gray-900'>
                {priceFormatter(Math.random() * 1_000_000)}
              </span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-base font-medium leading-tight text-gray-600'>
                Envío
              </span>
              <span className='text-lg font-semibold leading-tight text-gray-900'>
                {priceFormatter(Math.random() * 1000)}
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
              onClick={handleNextStep}
            >
              Continuar
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

export default CheckoutShipping;
