import { useNavigate, useParams } from "react-router-dom";
import { useCreateCheckout, useGetCheckout } from "../queries";
import {
  Button,
  Card,
  EmptyPlaceholder,
  Skeleton,
  Spinner,
  useToast,
} from "../../../../../components";
import { checkoutActionRoutes } from "../utils";

export const CheckPaymentIntent = ({ children }) => {
  const { paymentIntentId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { isLoading, isError } = useGetCheckout(paymentIntentId);
  const generatePaymentIntent = useCreateCheckout();

  const handleCheckout = () => {
    generatePaymentIntent.mutate(null, {
      onSuccess({ id }) {
        navigate(checkoutActionRoutes.shipping(id));
      },
      onError(error) {
        toast({
          title: "Error generating checkout",
          description: error.message,
        });
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <main className="container max-w-6xl flex-1 space-y-4">
          <section className="mt-4 space-y-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
          </section>

          <section className="grid-cols-8 gap-6 md:grid">
            <div className="md:col-span-5">
              <Card className="space-y-1 p-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            </div>

            <div className="md:col-span-3">
              <div className="space-y-4 rounded-md border border-gray-200 p-4">
                <div className="flex justify-between gap-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </section>
        </main>
      ) : isError ? (
        <main className="container grid max-w-6xl flex-1 place-content-center gap-4">
          <EmptyPlaceholder
            className="w-full sm:mx-auto sm:max-w-md"
            title="Session expired"
            description="For security reasons, your session has expired. Please start a new checkout."
          >
            <div className="mx-auto mt-4">
              <Button
                onClick={handleCheckout}
                disabled={generatePaymentIntent.isLoading}
              >
                {generatePaymentIntent.isLoading && (
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                New Checkout
              </Button>
            </div>
          </EmptyPlaceholder>
        </main>
      ) : (
        children
      )}
    </>
  );
};
