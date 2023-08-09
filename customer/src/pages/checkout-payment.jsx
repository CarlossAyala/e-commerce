import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  RadioTile,
  SkeletonText,
  TileGroup,
  InlineNotification,
} from '@carbon/react';
import { priceFormater } from '../utils/formater';
import { useCheckout } from '../features/checkout';
import { useCreateCheckoutSession } from '../features/stripe/checkout-session';
import {
  useGetNewPaymentMethod,
  useGetPaymentMethods,
} from '../features/payment-method';

const CheckoutPayment = () => {
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const {
    address,
    paymentIntent,
    paymentMethod,
    setPaymentMethod,
    setPaymentIntent,
    setAddress,
  } = useCheckout();
  const checkout = useCheckout();
  console.log('checkout', checkout);
  // console.log('paymentMethod ID', paymentMethod);

  const paymentMethods = useGetPaymentMethods();
  // console.log('Payment Methods', paymentMethods);

  const createCheckoutSession = useCreateCheckoutSession();

  const getNewPaymentMethod = useGetNewPaymentMethod();

  const handleAddPaymentMethod = async () => {
    try {
      const params = new URLSearchParams();
      params.append('address_id', address);
      params.append('payment_intent_id', paymentIntent);

      const stripeUrl = await createCheckoutSession.mutateAsync(
        params.toString()
      );
      console.log('Stripe url', stripeUrl);

      window.location.href = stripeUrl;
    } catch (error) {
      console.log('Checkout Payment');
      console.log('handleAddPaymentMethod', error);
    }
  };

  const handleGetPaymentMethod = async () => {
    try {
      const session_id = searchParams.get('session_id');
      const payment_intent_id = searchParams.get('payment_intent_id');
      const address_id = searchParams.get('address_id');
      const payment_method_id = await getNewPaymentMethod.mutateAsync(
        session_id
      );
      console.log('New Payment Method', payment_method_id);

      setPaymentMethod(payment_method_id);
      setPaymentIntent(payment_intent_id);
      if (address_id) setAddress(address_id);

      setSearchParams(new URLSearchParams());
    } catch (error) {
      console.log('Checkout Payment');
      console.log('handleNewPaymentMethod', error);
    }
  };

  const handlePaymentMethod = (value) => {
    setPaymentMethod(value);
    setSubmitted(true);
  };

  const handleNextStep = () => {
    if (paymentMethod) {
      navigate('/checkout/review');
      setSubmitted(true);
    } else {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const session_id = searchParams.get('session_id');
    if (session_id) handleGetPaymentMethod();
  }, []);

  return (
    <main className='flex w-full flex-col bg-white'>
      <section className='border-b border-gray-200 px-4 pb-4 pt-3'>
        <h1 className='text-2xl leading-none'>Checkout</h1>
        <h2 className='mt-1 text-base leading-none tracking-wide text-gray-600'>
          Payment
        </h2>
      </section>

      <section className='p-4'>
        <h3 className='text-lg leading-tight'>
          How much would you like to pay?
        </h3>

        {paymentMethods.isFetched && submitted && !paymentMethod ? (
          <InlineNotification
            aria-label='closes notification'
            title='You must select an payment method'
            subtitle='Please select one to continue.'
            className='mt-2'
            style={{ maxWidth: '100%' }}
          />
        ) : null}

        {paymentMethods.isLoading && (
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
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        )}

        {paymentMethods.isFetched && paymentMethods.data?.length === 0 ? (
          <div className='mt-4 bg-gray-100 p-4'>
            <p className='mb-2 text-base font-semibold leading-none text-gray-900'>
              You don&apos;t have any payment method yet.
            </p>
            <p className='text-sm leading-none text-gray-800'>
              Please add one to continue.
            </p>
            <div className='mt-4'>
              <Button
                size='md'
                kind='secondary'
                onClick={handleAddPaymentMethod}
              >
                Add payment method
              </Button>
            </div>
          </div>
        ) : null}

        {paymentMethods.isFetched && paymentMethods.data?.length > 0 ? (
          <section className='mt-4'>
            <div className='mb-2 flex items-center justify-between'>
              <p className='text-sm leading-none text-gray-500'>
                Select a payment method
              </p>
              <button
                type='button'
                onClick={handleAddPaymentMethod}
                className='text-sm text-blue-600'
              >
                Add payment method
              </button>
            </div>
            <TileGroup
              name='payment-methods'
              defaultSelected={paymentMethod}
              valueSelected={paymentMethod}
              onChange={handlePaymentMethod}
            >
              {paymentMethods.data.map((payment_method, index) => (
                <RadioTile
                  key={payment_method.id}
                  id={payment_method.id}
                  name={`payment-method-${payment_method.id}`}
                  tabIndex={index}
                  value={payment_method.id}
                  className={
                    index !== paymentMethods.data.length - 1 ? 'mb-2' : ''
                  }
                >
                  <p className='text-lg font-semibold capitalize text-gray-900'>
                    {payment_method.card.brand}
                  </p>
                  <p className='text-sm text-gray-800'>
                    Finished at {payment_method.card.last4}
                  </p>
                  <p className='text-sm text-gray-600'>
                    Expires on{' '}
                    <span>
                      {payment_method.card.exp_month}/
                      {payment_method.card.exp_year}
                    </span>
                  </p>
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

export default CheckoutPayment;
