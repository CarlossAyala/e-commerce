import { useNavigate, useParams } from "react-router-dom";
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
  FormMessage,
  RadioGroup,
  Skeleton,
  Spinner,
  useToast,
} from "../../../../../components";
import {
  checkoutReviewDefault,
  checkoutReviewInitial,
  checkoutReviewSchema,
} from "../schemas";
import { PaymentMethodItem } from "../components/payment-method-item";
import { useGetCart } from "../../cart";
import { useGetPaymentMethod } from "../../../../common/payment-method";
import { useGetAddress } from "../../address";
import { AddressItem } from "../components/address-item";
import { useConfirmCheckout } from "../queries";
import { checkoutActionRoutes } from "../utils";
import { useCheckout } from "../context";
import { CartItem } from "../../../components";

export const CheckoutReview = () => {
  const { paymentIntentId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { addressId, paymentMethodId } = useCheckout();

  const address = useGetAddress(addressId);
  const paymentMethod = useGetPaymentMethod(paymentMethodId);

  const confirmCheckout = useConfirmCheckout(paymentIntentId);
  const cart = useGetCart();

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
          variant: "destructive",
          title: "Error confirming order",
          description: error.message,
        });
      },
    });
  };

  return (
    <main className="container flex max-w-6xl flex-1 flex-col">
      <section className="mt-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          Checkout - Review
        </h2>
        <p className="leading-tight">
          Checkout your order and confirm your payment.
        </p>
      </section>

      <section className="mt-4 h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleConfirm)}
            className="grid-cols-8 gap-6 md:grid"
          >
            <div className="space-y-4 md:col-span-5">
              <div className="space-y-2">
                <h2 className="text-base leading-tight text-muted-foreground">
                  Shipping
                </h2>

                {!addressId ? (
                  <EmptyPlaceholder
                    title="No address"
                    description="Please select an address to continue"
                  >
                    <Button
                      className="mt-4"
                      onClick={() =>
                        navigate(checkoutActionRoutes.shipping(paymentIntentId))
                      }
                    >
                      Select an address
                    </Button>
                  </EmptyPlaceholder>
                ) : address.isLoading ? (
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

                {!paymentMethodId ? (
                  <EmptyPlaceholder
                    title="No payment method"
                    description="Please select an payment method to continue"
                  >
                    <Button
                      className="mt-4"
                      onClick={() =>
                        navigate(
                          checkoutActionRoutes.paymentMethod(paymentIntentId),
                        )
                      }
                    >
                      Select an payment method
                    </Button>
                  </EmptyPlaceholder>
                ) : paymentMethod.isLoading ? (
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
                  <Card className="divide-y divide-gray-200">
                    <CartItem.Skeleton className="p-4" />
                    <CartItem.Skeleton className="p-4" />
                    <CartItem.Skeleton className="p-4" />
                  </Card>
                ) : cart.isError ? (
                  <EmptyPlaceholder
                    title="Error"
                    description={cart.error.message}
                  />
                ) : (
                  <Card className="divide-y divide-gray-200">
                    {cart.data.map((item, index) => (
                      <CartItem key={index} item={item} className="p-4" />
                    ))}
                  </Card>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-2 md:col-span-3 md:mt-0">
              <h2 className="text-base leading-tight text-muted-foreground">
                Summary
              </h2>

              {cart.isLoading ? (
                <div className="space-y-4 rounded-md border border-gray-200 p-4">
                  <div className="flex justify-between gap-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/3" />
                  </div>
                  <div className="flex justify-between gap-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <div className="flex justify-between gap-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : cart.isError ? (
                <EmptyPlaceholder
                  title="Error"
                  description={cart.error.message}
                />
              ) : cart.isEmpty ? (
                <EmptyPlaceholder
                  title="Error"
                  description="Something went wrong with your Checkout."
                />
              ) : (
                <div className="space-y-2">
                  <div className="space-y-2 rounded-md border border-gray-200 p-4">
                    <div>
                      <div className="flex justify-between font-medium">
                        <p>Subtotal</p>
                        <p>{cart.subTotal}</p>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>Hidden</p>
                        <p>{cart.subTotalHidden}</p>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <p>Hidden + Subtotal</p>
                        <p>{cart.subTotalPlusHidden}</p>
                      </div>
                    </div>

                    <Button
                      className="w-full text-base"
                      size="lg"
                      type="submit"
                      disabled={
                        !addressId ||
                        !paymentMethodId ||
                        address.isLoading ||
                        paymentMethod.isLoading ||
                        confirmCheckout.isLoading
                      }
                    >
                      {confirmCheckout.isLoading && (
                        <Spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirm order
                    </Button>
                  </div>

                  <ul className="list-inside list-square text-sm text-muted-foreground">
                    <li>
                      The hidden products are used to see what the Checkout
                      would look like if they are deleted.
                    </li>
                    <li>
                      The hidden products DON&apos;T will be deleted when the
                      order is confirmed. They will appear at the end of the
                      order details.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};
