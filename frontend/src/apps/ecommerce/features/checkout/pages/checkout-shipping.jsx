import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { Formatter } from "@/shared/utils";
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
  buttonVariants,
} from "@/shared/components";
import { useGetCart } from "../../cart/queries";
import { addressActionRoutes, useGetAddresses } from "../../address";
import { calculateTotal } from "../../cart";
import {
  checkoutAddressDefault,
  checkoutAddressInitial,
  checkoutAddressSchema,
} from "../schemas";
import { CheckoutSummarySkeleton } from "../components/checkout-summary-skeleton";
import { AddressItem } from "../components/address-item";
import { checkoutActionRoutes } from "../utils";
import { useCheckout } from "../context";

export const CheckoutShipping = () => {
  useDocumentTitle("Checkout - Shipping");

  const { paymentIntentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addressId, updateAddress } = useCheckout();

  const { data: addresses, isLoading, isError, error } = useGetAddresses();
  const cart = useGetCart();

  const form = useForm({
    resolver: yupResolver(checkoutAddressSchema),
    defaultValues: checkoutAddressInitial,
    values: checkoutAddressDefault(addressId),
    mode: "onSubmit",
  });

  const handleSubmit = (values) => {
    if (values.addressId === "new") {
      navigate(addressActionRoutes.new, {
        state: {
          from: checkoutActionRoutes.shipping(paymentIntentId),
        },
      });
    } else {
      updateAddress(values.addressId);
      navigate(checkoutActionRoutes.payment(paymentIntentId));
    }
  };

  const newAddressId = location.state?.addressId;
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (newAddressId) {
      updateAddress(newAddressId);
    }
  }, [newAddressId]);

  const isEmpty = addresses?.length === 0;
  const total = calculateTotal(cart.data ?? []);
  const formAddressId = form.watch("addressId");

  return (
    <main className="container max-w-6xl flex-1 space-y-4 pb-10">
      <PageHeader>
        <PageHeaderHeading>Checkout - Shipping</PageHeaderHeading>
        <PageHeaderDescription>
          How do you want to receive your purchase?
        </PageHeaderDescription>
      </PageHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <section className="sm:w-4/6">
            <div className="space-y-2">
              <p className="text-sm leading-tight text-muted-foreground">
                Select an address to continue
              </p>

              {isLoading ? (
                <Card className="divide-y">
                  {new Array(3).fill(0).map((_, index) => (
                    <AddressItem.Skeleton key={index} />
                  ))}
                </Card>
              ) : isError ? (
                <EmptyState title="Error" description={error.message} />
              ) : isEmpty ? (
                <EmptyState
                  title="No addresses found"
                  description="Start creating one."
                >
                  <Link
                    className={buttonVariants()}
                    to={addressActionRoutes.new}
                    state={{
                      from: checkoutActionRoutes.shipping(paymentIntentId),
                    }}
                  >
                    Create
                  </Link>
                </EmptyState>
              ) : (
                <FormField
                  control={form.control}
                  name="addressId"
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
                                New Address
                              </FormLabel>
                            </FormItem>
                            {addresses.map((address) => (
                              <FormItem
                                key={address.id}
                                className="flex items-center gap-4 p-4"
                              >
                                <FormControl className="shrink-0">
                                  <RadioGroupItem value={address.id} />
                                </FormControl>
                                <FormLabel className="mb-0 grow">
                                  <AddressItem
                                    key={address.id}
                                    address={address}
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
                    disabled={isLoading || isEmpty}
                  >
                    {formAddressId === "new" ? "New Address" : "Continue"}
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
