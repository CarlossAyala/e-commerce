import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  RadioGroup,
  useToast,
} from "../../../../../components";
import {
  checkoutReviewDefault,
  checkoutReviewInitial,
  checkoutReviewSchema,
} from "../schemas";
import { PaymentMethodItem } from "../components/payment-method-item";
import { useGetCart } from "../../cart/queries";
import { CartSummary } from "../components/cart-summary";
import { useGetPaymentMethod } from "../../../../common/payment-method";
import { useGetAddress } from "../../address";
import { AddressItem } from "../components/address-item";
import { CartProductItem } from "../components/cart-product-item";
import { useConfirmCheckout } from "../queries";
import { checkoutActionRoutes } from "../utils";
import { useCheckout } from "../context";

const CheckoutReview = () => {
  const { paymentIntentId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { addressId, paymentMethodId } = useCheckout();

  const address = useGetAddress(addressId);
  const paymentMethod = useGetPaymentMethod(paymentMethodId);

  const confirmCheckout = useConfirmCheckout(paymentIntentId);
  const cart = useGetCart("only_visible=true");

  const form = useForm({
    resolver: yupResolver(checkoutReviewSchema),
    defaultValues: checkoutReviewInitial,
    values: checkoutReviewDefault({
      addressId,
      paymentMethodId,
    }),
    mode: "all",
  });

  const handleConfirm = (values) => {
    confirmCheckout.mutate(values, {
      onSuccess({ orderId }) {
        navigate(checkoutActionRoutes.details(orderId));
      },
      onError(error) {
        toast({
          title: "Error confirming order",
          description: error.message,
        });
      },
    });
  };

  return (
    <main className="container flex max-w-6xl flex-col">
      <section className="mt-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Checkout - Review
        </h1>
        <p className="mt-1 leading-tight">
          Checkout your order and confirm your payment.
        </p>
      </section>

      <section className="mt-4 h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleConfirm)}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <div className="grow space-y-4">
              <div className="space-y-2">
                <h2 className="text-base leading-tight text-muted-foreground">
                  Address
                </h2>
                {address.isLoading ? (
                  <Card>
                    <AddressItem.Skeleton />
                  </Card>
                ) : address.isError ? (
                  <EmptyPlaceholder
                    title="Error"
                    description={address.error.message}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="addressId"
                    render={({ field }) => (
                      <FormItem>
                        <FormMessage className="mb-1 mt-0" />
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col gap-1"
                          >
                            <Card className="p-4">
                              <AddressItem address={address.data} />
                            </Card>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div className="space-y-2">
                <h2 className="text-base leading-tight text-muted-foreground">
                  Payment Method
                </h2>
                {paymentMethod.isLoading ? (
                  <Card>
                    <PaymentMethodItem.Skeleton />
                  </Card>
                ) : paymentMethod.isError ? (
                  <EmptyPlaceholder
                    title="Error"
                    description={paymentMethod.error.message}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="paymentMethodId"
                    render={({ field }) => (
                      <FormItem>
                        <FormMessage className="mb-1 mt-0" />
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col gap-1"
                          >
                            <Card className="p-4">
                              <PaymentMethodItem
                                paymentMethod={paymentMethod.data}
                              />
                            </Card>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div className="space-y-2">
                <h2 className="text-base leading-tight text-muted-foreground">
                  Products
                </h2>

                {cart.isLoading ? (
                  <Card className="divide-y divide-black/10">
                    <CartProductItem.Skeleton />
                    <CartProductItem.Skeleton />
                    <CartProductItem.Skeleton />
                  </Card>
                ) : cart.isError ? (
                  <EmptyPlaceholder
                    title="Error"
                    description={cart.error.message}
                  />
                ) : (
                  <Card className="divide-y divide-black/10">
                    {cart.data.map((item) => (
                      <CartProductItem key={item.id} item={item} />
                    ))}
                  </Card>
                )}
              </div>
            </div>

            <div className="w-full sm:max-w-sm">
              {cart.isLoading ? (
                <Card>
                  <CartSummary.Skeleton />
                </Card>
              ) : cart.isError ? (
                <EmptyPlaceholder
                  title="Error"
                  description={cart.error.message}
                />
              ) : (
                <Card>
                  <CartSummary cart={cart.data}>
                    <Button
                      className="mt-4 w-full"
                      size="lg"
                      type="submit"
                      disabled={confirmCheckout.isLoading}
                    >
                      {confirmCheckout.isLoading && (
                        <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirm Order
                    </Button>
                  </CartSummary>
                </Card>
              )}
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default CheckoutReview;
