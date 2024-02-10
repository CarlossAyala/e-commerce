import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import { CheckoutContext } from "../context";
import { useGetPaymentMethodSession } from "../../../../common/payment-method";
import { useToast } from "../../../../../components";
import { useMGetAddress } from "../../address";

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

  const { toast } = useToast();

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
        toast({
          title: "Session error",
          description: error?.message ?? "Uh oh! Something went wrong.",
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
          description: error?.message ?? "Uh oh! Something went wrong.",
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
