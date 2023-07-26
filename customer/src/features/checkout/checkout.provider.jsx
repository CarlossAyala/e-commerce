import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext({});
export const useCheckout = () => useContext(CheckoutContext);

export const CheckoutProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [paymentIntent, setPaymentIntent] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const resetCheckout = () => {
    setAddress('');
    setPaymentIntent('');
    setPaymentMethod('');
  };

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        paymentIntent,
        setPaymentIntent,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
