import { useNavigate, useParams } from "react-router-dom";
import { EmptyState } from "@/shared/components";
import { Button, Card, Skeleton, Spinner } from "@/components";
import { useCreatePaymentIntent, useGetPaymentIntent } from "../queries";
import { checkoutActionRoutes } from "../utils";

export const CheckPaymentIntent = ({ children }) => {
  const { paymentIntentId } = useParams();

  const navigate = useNavigate();

  const { isLoading, isError } = useGetPaymentIntent(paymentIntentId);
  const createPaymentIntent = useCreatePaymentIntent();

  const handleCreate = () => {
    createPaymentIntent.mutate(null, {
      onSuccess({ id }) {
        navigate(checkoutActionRoutes.shipping(id));
      },
    });
  };

  return isLoading ? (
    <main className="container max-w-6xl flex-1 space-y-4">
      <section className="mt-4 space-y-2">
        <Skeleton className="h-8 w-3/4 sm:w-1/2" />
        <Skeleton className="h-5 w-full" />
      </section>

      <section className="flex flex-col gap-4 sm:flex-row">
        <Card className="space-y-2 p-4 sm:w-4/6">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </Card>

        <Card className="space-y-4 p-4 sm:w-2/6">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/3" />
          </div>
          <Skeleton className="h-10 w-full" />
        </Card>
      </section>
    </main>
  ) : isError ? (
    <main className="container grid max-w-6xl flex-1 place-content-center gap-4">
      <EmptyState
        title="Session expired"
        description="For security reasons, your session has expired. Please start a new checkout."
      >
        <div className="mx-auto">
          <Button
            onClick={handleCreate}
            disabled={createPaymentIntent.isLoading}
          >
            {createPaymentIntent.isLoading && (
              <Spinner className="mr-2 size-4" />
            )}
            New Checkout
          </Button>
        </div>
      </EmptyState>
    </main>
  ) : (
    children
  );
};
