import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCheckout } from "../queries";
import { useCheckoutStore, useUpdateCheckoutPaymentIntent } from "../stores";
import {
  Button,
  EmptyPlaceholder,
  MainContent,
  useToast,
} from "../../../../../components";
import { checkoutActionRoutes } from "../utils";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const WithPaymentIntent = ({ component: Component }) => {
  const [createPaymentIntentFlag, setCreatePaymentIntentFlag] = useState(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  const { paymentIntentId } = useCheckoutStore();
  const updatePaymentIntent = useUpdateCheckoutPaymentIntent();

  const createPaymentIntent = useCreateCheckout();

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

  useEffect(
    // Checkout -> Address -> Payment Method -> Review
    function restartCheckoutSteps() {
      if (!paymentIntentId) {
        navigate(checkoutActionRoutes.shipping);
      }
    },
    [navigate, paymentIntentId],
  );

  if (!paymentIntentId) {
    return (
      <MainContent className="flex items-center justify-center">
        <EmptyPlaceholder>
          <EmptyPlaceholder.Title>Start Checkout</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Once you start the Checkout Process, you will have to select an
            Address, Payment Method and finally, confirm the purchase.
          </EmptyPlaceholder.Description>
          <Button
            type="button"
            disabled={createPaymentIntent.isLoading}
            onClick={generatePaymentIntent}
            className="flex items-center justify-center"
          >
            {createPaymentIntent.isLoading && (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {createPaymentIntentFlag ? "Try again" : "Start Checkout"}
          </Button>
        </EmptyPlaceholder>
      </MainContent>
    );
  }

  return <Component />;
};

export default WithPaymentIntent;
