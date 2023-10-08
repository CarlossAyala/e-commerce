import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  MainContent,
  RadioGroup,
  RadioGroupItem,
  useToast,
} from "../../../../../components";
import {
  checkoutPaymentMethodDefault,
  checkoutPaymentMethodInitial,
  checkoutPaymentMethodSchema,
} from "../schemas";
import { useCheckoutStore, useUpdateCheckoutPaymentMethod } from "../stores";
import { PaymentMethodItem } from "../components/payment-method-item";
import { useGetCart } from "../../cart/queries";
import { CartSummary } from "../components/cart-summary";
import { checkoutActionRoutes } from "../utils";
import {
  useCreatePaymentMethod,
  useGetPaymentMethods,
} from "../../../../common/payment-method";

const CheckoutPaymentMethod = () => {
  const { toast } = useToast();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { paymentIntentId, addressId, paymentMethodId } = useCheckoutStore();
  const updateCheckoutPaymentMethod = useUpdateCheckoutPaymentMethod();

  const paymentMethods = useGetPaymentMethods();
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

  const handleSubmit = (values) => {
    updateCheckoutPaymentMethod(values.paymentMethodId);
    navigate(checkoutActionRoutes.review);
  };

  useEffect(() => {
    const newPaymentMethodId = location.state?.paymentMethodId;
    if (newPaymentMethodId) {
      updateCheckoutPaymentMethod(newPaymentMethodId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("paymentMethodId")]);

  return (
    <MainContent className="flex max-w-5xl flex-col">
      <section className="mt-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Checkout - Payment Method
        </h1>
        <p className="mt-1 leading-tight">How do you want to pay?</p>
      </section>

      <section className="mt-4 h-full">
        <h2 className="text-base leading-tight text-muted-foreground">
          Select an payment method to continue.
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-2 flex h-full gap-4"
          >
            <div className="grow space-y-4">
              {paymentMethods.isLoading && (
                <Card>
                  <div className="divide-y divide-black/10">
                    <PaymentMethodItem.Skeleton />
                    <PaymentMethodItem.Skeleton />
                    <PaymentMethodItem.Skeleton />
                    <PaymentMethodItem.Skeleton />
                  </div>
                </Card>
              )}
              {paymentMethods.isError && <p>Error fetching addresses</p>}
              {paymentMethods.isSuccess && (
                <>
                  <FormField
                    control={form.control}
                    name="paymentMethodId"
                    render={({ field }) => (
                      <FormItem>
                        <FormMessage className="mb-1 mt-0" />
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={paymentMethodId}
                            className="flex flex-col gap-1"
                          >
                            <Card className="divide-y divide-black/10">
                              {paymentMethods.data.map((paymentMethod) => (
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
                </>
              )}
              <div className="sticky bottom-0 mt-auto rounded-b-md bg-white md:hidden">
                <Card className="sticky top-4">
                  {cart.isLoading ? (
                    <CartSummary.Skeleton />
                  ) : (
                    <>{cart.isSuccess && <CartSummary cart={cart.data} />}</>
                  )}
                </Card>
              </div>
            </div>
            <div className="relative hidden w-full max-w-sm shrink-0 md:block">
              {cart.isLoading && (
                <Card>
                  <CartSummary.Skeleton />
                </Card>
              )}
              {cart.isSuccess && (
                <Card className="sticky top-4">
                  <CartSummary cart={cart.data}>
                    <Button className="mt-4 w-full" size="lg" type="submit">
                      Next
                    </Button>
                  </CartSummary>
                </Card>
              )}
            </div>
          </form>
        </Form>
      </section>
    </MainContent>
  );
};

export default CheckoutPaymentMethod;
