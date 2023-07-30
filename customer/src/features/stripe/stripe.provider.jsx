import { Elements } from '@stripe/react-stripe-js';
import { useCheckout } from '../checkout';
import { stripePromise } from '.';

export const StripeProvider = ({ children }) => {
  const checkout = useCheckout();

  if (checkout.paymentItent) {
    const options = {
      clientSecret: checkout.paymentItent.client_secret,
    };

    return (
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    );
  }

  return children;
};
