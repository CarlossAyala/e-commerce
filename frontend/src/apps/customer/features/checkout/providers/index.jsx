import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import { CheckoutContext } from "../context";
import { useGetPaymentMethodSession } from "../../../../common/payment-method";
import { useMGetAddress } from "../../address";
import { toast } from "sonner";

const initialState = {
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
      return initialState;
    default:
      return state;
  }
};

export const CheckoutProvider = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getSession = useGetPaymentMethodSession();
  const getAddress = useMGetAddress();

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
    getSession.mutate(sessionId, {
      onSuccess({ id: newPaymentMethodId }) {
        updatePaymentMethod(newPaymentMethodId);
      },
      onError(error) {
        toast.message("Session error", {
          description: error.message,
        });
      },
    });
  };

  const handleAddressId = (addressId) => {
    getAddress.mutate(addressId, {
      onSuccess() {
        updateAddress(addressId);
      },
      onError(error) {
        toast({
          title: "Address error",
          description: error.message,
        });
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
