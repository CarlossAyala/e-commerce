import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreateCheckout } from "../queries";
import {
  useCheckoutStore,
  useUpdateCheckoutAddress,
  useUpdateCheckoutPaymentIntent,
  useUpdateCheckoutPaymentMethod,
} from "../stores";
import { Button, EmptyPlaceholder, useToast } from "../../../../../components";
import { checkoutActionRoutes } from "../utils";
import { useGetPaymentMethodSession } from "../../../../common/payment-method";
import { CheckoutShippingSkeleton } from "../components/checkout-shipping-skeleton";

const PARAMS = {
  sessionId: "session_id",
  addressId: "address_id",
  paymentIntentId: "payment_intent_id",
};

const WithPaymentIntent = ({ component: Component }) => {
  const [createPaymentIntentFlag, setCreatePaymentIntentFlag] = useState(false);

  const [params, setParams] = useSearchParams();
  const { toast } = useToast();

  const navigate = useNavigate();

  const { paymentIntentId } = useCheckoutStore();
  const updatePaymentIntent = useUpdateCheckoutPaymentIntent();
  const updateCheckoutAddress = useUpdateCheckoutAddress();
  const updateCheckoutPaymentMethod = useUpdateCheckoutPaymentMethod();

  const createPaymentIntent = useCreateCheckout();
  const getPaymentMethodSession = useGetPaymentMethodSession();

  const handleGetPaymentMethodSession = (sessionId) => {
    getPaymentMethodSession.mutate(sessionId, {
      onSuccess(paymentMethod) {
        updatePaymentIntent(params.get(PARAMS.paymentIntentId));
        if (params.get(PARAMS.addressId)) {
          updateCheckoutAddress(params.get(PARAMS.addressId));
        }
        if (paymentMethod.id) updateCheckoutPaymentMethod(paymentMethod.id);

        navigate(checkoutActionRoutes.paymentMethod, {
          state: {
            newPaymentMethod: true,
          },
        });
      },
      onError(error) {
        toast({
          title: "Error fetching payment method",
          description: error.message,
        });
        setParams(new URLSearchParams());
      },
    });
  };

  const generatePaymentIntent = () => {
    createPaymentIntent.mutate(null, {
      onSettled() {
        setCreatePaymentIntentFlag(true);
      },
      onSuccess({ id }) {
        updatePaymentIntent(id);
      },
      onError(error) {
        toast({
          title: "Checkout could not be generated",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const sessionId = params.get(PARAMS.sessionId);

  useEffect(
    function handlePaymentMethodSession() {
      if (sessionId) {
        handleGetPaymentMethodSession(sessionId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionId],
  );

  useEffect(
    // Checkout -> Address -> Payment Method -> Review
    function restartCheckoutSteps() {
      if (!paymentIntentId && !sessionId) {
        navigate(checkoutActionRoutes.shipping);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentIntentId, sessionId],
  );

  if (sessionId) {
    return <CheckoutShippingSkeleton />;
  }

  if (!paymentIntentId && !sessionId) {
    return (
      <main className="container flex items-center justify-center">
        <EmptyPlaceholder
          title="Start Checkout"
          description="Once you start the Checkout Process, you will have to select an
            Address, Payment Method and finally, confirm the purchase."
        >
          <div className="mx-auto mt-4">
            <Button
              type="button"
              disabled={createPaymentIntent.isLoading}
              onClick={generatePaymentIntent}
              className="flex items-center justify-center"
            >
              {createPaymentIntent.isLoading && (
                <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              {createPaymentIntentFlag ? "Try again" : "Start"}
            </Button>
          </div>
        </EmptyPlaceholder>
      </main>
    );
  }

  return <Component />;
};

export default WithPaymentIntent;
