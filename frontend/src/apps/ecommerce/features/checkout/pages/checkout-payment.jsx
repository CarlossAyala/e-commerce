import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreatePaymentMethod,
  useGetPaymentMethods,
} from "@/features/payment-method";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  Spinner,
} from "@/shared/components";
import { Formatter, clearEmptyValues } from "@/shared/utils";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from "@/shared/components";
import { useGetCart } from "../../cart/queries";
import { PaymentMethodItem } from "../components/payment-method-item";
import { CheckoutSummarySkeleton } from "../components/checkout-summary-skeleton";
import {
  checkoutPaymentMethodDefault,
  checkoutPaymentMethodInitial,
  checkoutPaymentMethodSchema,
} from "../schemas";
import { checkoutActionRoutes } from "../utils";
import { useCheckout } from "../context";
import { calculateTotal } from "../../cart";

export const CheckoutPayment = () => {
  useDocumentTitle("Checkout - Payment Method");
  const [params, setParams] = useSearchParams();
  const { paymentIntentId } = useParams();

  const navigate = useNavigate();

  const {
    addressId,
    paymentMethodId,
    updatePaymentMethod,
    handleSessionId,
    handleAddressId,
  } = useCheckout();

  const {
    data: paymentMethods,
    isLoading,
    isError,
    error,
  } = useGetPaymentMethods();

  const createPaymentMethod = useCreatePaymentMethod();

  const cart = useGetCart();

  const form = useForm({
    resolver: yupResolver(checkoutPaymentMethodSchema),
    defaultValues: checkoutPaymentMethodInitial,
    values: checkoutPaymentMethodDefault(paymentMethodId),
    mode: "onSubmit",
  });

  const handleCreatePaymentMethod = () => {
    const values = clearEmptyValues({ paymentIntentId, addressId });

    createPaymentMethod.mutate(values, {
      onSuccess(createPaymentMethodUrl) {
        window.location.href = createPaymentMethodUrl;
      },
    });
  };

  const handleSubmit = (values) => {
    if (values.paymentMethodId === "new") {
      handleCreatePaymentMethod();
    } else {
      updatePaymentMethod(values.paymentMethodId);
      navigate(checkoutActionRoutes.review(paymentIntentId));
    }
  };

  const session_id = params.get("session_id");
  const address_id = params.get("address_id");
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (session_id) {
      handleSessionId(session_id);
    }
    if (address_id) {
      handleAddressId(address_id);
    }
    if (address_id || session_id) {
      setParams(new URLSearchParams());
    }
  }, [session_id, addressId]);

  const isEmpty = !paymentMethods?.length;
  const formPaymentMethodId = form.watch("paymentMethodId");
  const total = calculateTotal(cart.data ?? []);

  return (
    <main className="container max-w-6xl flex-1 space-y-4 pb-10">
      <PageHeader>
        <PageHeaderHeading>Checkout - Payment Method</PageHeaderHeading>
        <PageHeaderDescription>How do you want to pay?</PageHeaderDescription>
      </PageHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <section className="sm:w-4/6">
            <div className="space-y-2">
              <p className="text-sm leading-tight text-muted-foreground">
                Select an payment method to continue.
              </p>

              {isLoading ? (
                <Card className="divide-y">
                  {new Array(3).fill(0).map((_, index) => (
                    <PaymentMethodItem.Skeleton key={index} />
                  ))}
                </Card>
              ) : isError ? (
                <EmptyState title="Error" description={error.message} />
              ) : isEmpty ? (
                <EmptyState
                  title="No cards found"
                  description="Start adding one."
                >
                  <Button
                    disabled={createPaymentMethod.isLoading}
                    onClick={handleCreatePaymentMethod}
                  >
                    {createPaymentMethod.isLoading && (
                      <Spinner className="mr-2 size-4" />
                    )}
                    Add
                  </Button>
                </EmptyState>
              ) : (
                <FormField
                  control={form.control}
                  name="paymentMethodId"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <Card className="divide-y">
                            <FormItem className="flex items-center gap-4 p-4">
                              <FormControl className="shrink-0">
                                <RadioGroupItem value="new" />
                              </FormControl>
                              <FormLabel className="mb-0 grow">
                                New Card
                              </FormLabel>
                            </FormItem>
                            {paymentMethods.map((paymentMethod) => (
                              <FormItem
                                key={paymentMethod.id}
                                className="flex items-center gap-4 px-4 py-3"
                              >
                                <FormControl className="shrink-0">
                                  <RadioGroupItem value={paymentMethod.id} />
                                </FormControl>
                                <FormLabel className="mb-0 grow">
                                  <PaymentMethodItem
                                    key={paymentMethod.id}
                                    paymentMethod={paymentMethod}
                                  />
                                </FormLabel>
                              </FormItem>
                            ))}
                          </Card>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </section>

          <section className="sm:w-2/6">
            <div className="space-y-2">
              <p className="text-sm leading-tight text-muted-foreground">
                Summary
              </p>

              {cart.isLoading ? (
                <CheckoutSummarySkeleton />
              ) : cart.isError ? (
                <EmptyState title="Error" description={cart.error.message} />
              ) : (
                <Card className="space-y-2 p-4">
                  <div className="flex justify-between font-medium">
                    <p>Total</p>
                    <p>{Formatter.currency(total)}</p>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    type="submit"
                    disabled={
                      isLoading || isEmpty || createPaymentMethod.isLoading
                    }
                  >
                    {createPaymentMethod.isLoading && (
                      <Spinner className="mr-2 size-4" />
                    )}
                    {formPaymentMethodId === "new" ? "New Card" : "Continue"}
                  </Button>
                </Card>
              )}
            </div>
          </section>
        </form>
      </Form>
    </main>
  );
};
