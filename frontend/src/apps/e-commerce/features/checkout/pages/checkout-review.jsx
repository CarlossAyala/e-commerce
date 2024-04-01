import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetPaymentMethod } from "@/shared/features/payment-method";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  RadioGroup,
  Spinner,
} from "@/components";
import { Formatter } from "@/utils";
import { useGetAddress } from "../../address";
import { calculateTotal, useGetCart } from "../../cart";
import { AddressItem } from "../components/address-item";
import { PaymentMethodItem } from "../components/payment-method-item";
import { CheckoutItemPreview } from "../components/checkout-item-preview";
import { CheckoutSummarySkeleton } from "../components/checkout-summary-skeleton";
import { useConfirmPaymentIntent } from "../queries";
import { checkoutActionRoutes } from "../utils";
import { useCheckout } from "../context";
import {
  checkoutReviewDefault,
  checkoutReviewInitial,
  checkoutReviewSchema,
} from "../schemas";

export const CheckoutReview = () => {
  useDocumentTitle("Checkout - Review");
  const { paymentIntentId } = useParams();

  const navigate = useNavigate();

  const { addressId, paymentMethodId } = useCheckout();

  const address = useGetAddress(addressId);
  const paymentMethod = useGetPaymentMethod(paymentMethodId);

  const confirmCheckout = useConfirmPaymentIntent(paymentIntentId);
  const cart = useGetCart();

  const form = useForm({
    resolver: yupResolver(checkoutReviewSchema),
    defaultValues: checkoutReviewInitial,
    values: checkoutReviewDefault({
      addressId,
      paymentMethodId,
    }),
    mode: "onSubmit",
  });

  const handleConfirm = (values) => {
    confirmCheckout.mutate(values, {
      onSuccess(order) {
        navigate(checkoutActionRoutes.details(order), {
          state: {
            paymentIntentId,
          },
        });
      },
    });
  };

  const total = calculateTotal(cart.data ?? []);

  return (
    <main className="container max-w-6xl flex-1 space-y-4	pb-10">
      <PageHeader>
        <PageHeaderHeading>Checkout - Review</PageHeaderHeading>
        <PageHeaderDescription>
          Checkout your order and confirm your payment.
        </PageHeaderDescription>
      </PageHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleConfirm)}
          className="flex flex-col gap-4 md:flex-row"
        >
          <section className="space-y-4 md:w-4/6">
            <div className="space-y-2">
              <p className="text-sm leading-tight text-muted-foreground">
                Shipping
              </p>

              {!addressId ? (
                <EmptyState
                  title="No address"
                  description="Please select an address to continue"
                >
                  <Button
                    onClick={() =>
                      navigate(checkoutActionRoutes.shipping(paymentIntentId))
                    }
                  >
                    Select an address
                  </Button>
                </EmptyState>
              ) : address.isLoading ? (
                <Card>
                  <AddressItem.Skeleton />
                </Card>
              ) : address.isError ? (
                <EmptyState title="Error" description={address.error.message} />
              ) : (
                <FormField
                  control={form.control}
                  name="addressId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
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
              <p className="text-sm leading-tight text-muted-foreground">
                Payment Method
              </p>

              {!paymentMethodId ? (
                <EmptyState
                  title="No payment method"
                  description="Please select an payment method to continue"
                >
                  <Button
                    onClick={() =>
                      navigate(checkoutActionRoutes.payment(paymentIntentId))
                    }
                  >
                    Select an payment method
                  </Button>
                </EmptyState>
              ) : paymentMethod.isLoading ? (
                <Card>
                  <PaymentMethodItem.Skeleton />
                </Card>
              ) : paymentMethod.isError ? (
                <EmptyState
                  title="Error"
                  description={paymentMethod.error.message}
                />
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
              <p className="text-sm leading-tight text-muted-foreground">
                Products
              </p>

              {cart.isLoading ? (
                <Card className="divide-y">
                  {new Array(3).fill(null).map((_, index) => (
                    <CheckoutItemPreview.Skeleton key={index} />
                  ))}
                </Card>
              ) : cart.isError ? (
                <EmptyState title="Error" description={cart.error.message} />
              ) : (
                <Card className="divide-y">
                  {cart.data.map((item) => (
                    <CheckoutItemPreview key={item.id} item={item} />
                  ))}
                </Card>
              )}
            </div>
          </section>

          <section className="md:w-2/6">
            <div className="space-y-2 md:sticky md:top-16">
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
                    className="w-full text-base"
                    size="lg"
                    type="submit"
                    disabled={
                      !address.data ||
                      !paymentMethod.data ||
                      confirmCheckout.isLoading
                    }
                  >
                    {confirmCheckout.isLoading && (
                      <Spinner className="mr-2 size-4" />
                    )}
                    Confirm order
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
