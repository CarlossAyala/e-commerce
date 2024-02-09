import { useEffect } from "react";
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
  Skeleton,
  useToast,
} from "../../../../../components";
import {
  checkoutPaymentMethodDefault,
  checkoutPaymentMethodInitial,
  checkoutPaymentMethodSchema,
} from "../schemas";
import { PaymentMethodItem } from "../components/payment-method-item";
import { useGetCart } from "../../cart/queries";
import { checkoutActionRoutes } from "../utils";
import {
  useCreatePaymentMethod,
  useGetPaymentMethods,
} from "../../../../common/payment-method";
import { useCheckout } from "../context";

export const CheckoutPaymentMethod = () => {
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

  const { paymentMethods, isLoading, isError, error, isEmpty } =
    useGetPaymentMethods();

  const createPaymentMethod = useCreatePaymentMethod();

  const cart = useGetCart();

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

  return (
    <main className="container flex max-w-6xl flex-1 flex-col space-y-4">
      <section className="mt-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          Checkout - Payment Method
        </h2>
        <p className="mt-1 leading-tight">How do you want to pay?</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base leading-tight text-muted-foreground">
          Select an payment method to continue.
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNext)}
            className="grid-cols-8 gap-6 md:grid"
          >
            {isLoading ? (
              <Card className="divide-y divide-black/10 md:col-span-5">
                <PaymentMethodItem.Skeleton />
                <PaymentMethodItem.Skeleton />
                <PaymentMethodItem.Skeleton />
              </Card>
            ) : isError ? (
              <EmptyPlaceholder
                title="Error"
                description={error.message}
                className="md:col-span-5"
              />
            ) : isEmpty ? (
              <EmptyPlaceholder
                title="No cards found"
                description="Start adding one."
                className="md:col-span-5"
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
                  <FormItem className="md:col-span-5">
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

            {cart.isLoading ? (
              <div className="mt-6 md:col-span-3 md:mt-0">
                <div className="space-y-4 rounded-md border border-gray-200 p-4">
                  <div className="flex justify-between gap-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>

                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ) : cart.isError ? (
              <EmptyPlaceholder
                title="Error"
                description={cart.error.message}
                className="mt-6 md:col-span-3 md:mt-0"
              />
            ) : cart.isEmpty ? (
              <EmptyPlaceholder
                title="Error"
                description="Something went wrong with your Checkout."
                className="mt-6 md:col-span-3 md:mt-0"
              />
            ) : (
              <div className="mt-6 md:col-span-3 md:mt-0">
                <div className="space-y-2 rounded-md border border-gray-200 p-4">
                  <div className="flex justify-between font-medium">
                    <p>Subtotal</p>
                    <p>{cart.subTotal}</p>
                  </div>

                  <Button className="w-full text-base" size="lg" type="submit">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </section>
    </main>
  );
};
