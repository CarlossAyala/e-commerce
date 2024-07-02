import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import { useGetPaymentMethodSession } from "@/features/payment-method";
import { useMGetAddress } from "../../address";
import { CheckoutContext } from "../context";

const INITIAL_STATE = {
  addressId: "",
  paymentMethodId: "",
};
const ACTION_TYPES = {
  SET_ADDRESS_ID: "SET_ADDRESS_ID",
  SET_PAYMENT_METHOD_ID: "SET_PAYMENT_METHOD_ID",
  RESET: "RESET",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ADDRESS_ID:
      return { ...state, addressId: action.payload };
    case ACTION_TYPES.SET_PAYMENT_METHOD_ID:
      return { ...state, paymentMethodId: action.payload };
    case ACTION_TYPES.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const CheckoutProvider = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const session = useGetPaymentMethodSession();
  const address = useMGetAddress();

  const updateAddress = (addressId) => {
    dispatch({
      type: ACTION_TYPES.SET_ADDRESS_ID,
      payload: addressId,
    });
  };

  const updatePaymentMethod = (paymentMethodId) => {
    dispatch({
      type: ACTION_TYPES.SET_PAYMENT_METHOD_ID,
      payload: paymentMethodId,
    });
  };

  const handleSessionId = (sessionId) => {
    session.mutate(sessionId, {
      onSuccess({ id: newPaymentMethodId }) {
        updatePaymentMethod(newPaymentMethodId);
      },
    });
  };

  const handleAddressId = (addressId) => {
    address.mutate(addressId, {
      onSuccess() {
        updateAddress(addressId);
      },
    });
  };

  const resetCheckout = () => {
    dispatch({ type: ACTION_TYPES.RESET });
  };

  const { addressId, paymentMethodId } = state;

  return (
    <CheckoutContext.Provider
      value={{
        addressId,
        paymentMethodId,
        handleSessionId,
        handleAddressId,
        updateAddress,
        updatePaymentMethod,
        resetCheckout,
      }}
    >
      <Outlet />
    </CheckoutContext.Provider>
  );
};
