import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  useToast,
} from "../../../../../components";
import {
  checkoutPaymentMethodDefault,
  checkoutPaymentMethodInitial,
  checkoutPaymentMethodSchema,
} from "../schemas";
import { PaymentMethodItem } from "../components/payment-method-item";
import { useGetCart } from "../../cart/queries";
import { CartSummary } from "../components/cart-summary";
import { checkoutActionRoutes } from "../utils";
import {
  useCreatePaymentMethod,
  useGetPaymentMethods,
} from "../../../../common/payment-method";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useCheckout } from "../context";

const CheckoutPaymentMethod = () => {
  const [params, setParams] = useSearchParams();
  const { paymentIntentId } = useParams();
  const { toast } = useToast();
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
    isSuccess,
    error,
  } = useGetPaymentMethods();

  const createPaymentMethod = useCreatePaymentMethod();

  const cart = useGetCart("only_visible=true");

  const form = useForm({
    resolver: yupResolver(checkoutPaymentMethodSchema),
    defaultValues: checkoutPaymentMethodInitial,
    values: checkoutPaymentMethodDefault(paymentMethodId),
    mode: "all",
  });

  const handleCreatePaymentMethod = () => {
    createPaymentMethod.mutate(
      {
        paymentIntentId,
        addressId,
      },
      {
        onSuccess(createPaymentMethodUrl) {
          window.location.href = createPaymentMethodUrl;
        },
        onError(error) {
          toast({
            title: "Error creating payment method",
            description: error.message,
          });
        },
      },
    );
  };

  const handleNext = (values) => {
    if (values.paymentMethodId === "new") {
      handleCreatePaymentMethod();
    } else {
      updatePaymentMethod(values.paymentMethodId);
      navigate(checkoutActionRoutes.review(paymentIntentId));
    }
  };

  useEffect(() => {
    const session_id = params.get("session_id");
    const address_id = params.get("address_id");
    if (session_id) {
      handleSessionId(session_id);
    }
    if (address_id) {
      handleAddressId(address_id);
    }
    if (address_id || session_id) {
      setParams(new URLSearchParams());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmpty = isSuccess && paymentMethods.length === 0;

  return (
    <main className="container flex max-w-6xl flex-col space-y-4">
      <section className="mt-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Checkout - Payment Method
        </h1>
        <p className="mt-1 leading-tight">How do you want to pay?</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base leading-tight text-muted-foreground">
          Select an payment method to continue.
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNext)}
            className="flex flex-col gap-4 sm:flex-row"
          >
            {isLoading ? (
              <Card className="grow divide-y divide-black/10">
                <PaymentMethodItem.Skeleton />
                <PaymentMethodItem.Skeleton />
                <PaymentMethodItem.Skeleton />
              </Card>
            ) : isError ? (
              <EmptyPlaceholder title="Error" description={error.message} />
            ) : isEmpty ? (
              <EmptyPlaceholder
                title="No cards found"
                description="Start adding one."
              >
                <Button className="mt-4" onClick={handleCreatePaymentMethod}>
                  Add
                </Button>
              </EmptyPlaceholder>
            ) : (
              <FormField
                control={form.control}
                name="paymentMethodId"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormMessage className="mb-1 mt-0" />
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={paymentMethodId}
                        value={field.value}
                        className="flex flex-col gap-1"
                      >
                        <Card className="divide-y divide-black/10">
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

            <div className="w-full sm:max-w-sm">
              <Card>
                {cart.isLoading ? (
                  <CartSummary.Skeleton />
                ) : cart.isError ? (
                  <EmptyPlaceholder
                    title="Error"
                    description={cart.error.message}
                  />
                ) : (
                  <CartSummary cart={cart.data}>
                    <Button
                      className="mt-4 w-full"
                      size="lg"
                      disabled={createPaymentMethod.isLoading}
                      type="submit"
                    >
                      {createPaymentMethod.isLoading && (
                        <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Next
                    </Button>
                  </CartSummary>
                )}
              </Card>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default CheckoutPaymentMethod;
