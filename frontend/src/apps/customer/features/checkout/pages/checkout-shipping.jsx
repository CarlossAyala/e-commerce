import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
} from "../../../../../components";
import { addressActionRoutes, useGetAddresses } from "../../address";
import {
  checkoutAddressDefault,
  checkoutAddressInitial,
  checkoutAddressSchema,
} from "../schemas";
import { useCheckoutStore, useUpdateCheckoutAddress } from "../stores";
import { AddressItem } from "../components/address-item";
import { useGetCart } from "../../cart/queries";
import { CartSummary } from "../components/cart-summary";
import { checkoutActionRoutes } from "../utils";
import { FaceFrownIcon, InboxIcon } from "@heroicons/react/24/outline";

const CheckoutShipping = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const addressId = useCheckoutStore((state) => state.addressId);
  const updateCheckoutAddress = useUpdateCheckoutAddress();

  const addresses = useGetAddresses();
  const cart = useGetCart("only_visible=true");

  const form = useForm({
    resolver: yupResolver(checkoutAddressSchema),
    defaultValues: checkoutAddressInitial,
    values: checkoutAddressDefault(addressId),
    mode: "all",
  });

  const handleSubmit = (values) => {
    if (values.addressId === "new") {
      navigate(addressActionRoutes.new, {
        state: {
          from: checkoutActionRoutes.shipping,
        },
      });
    } else {
      updateCheckoutAddress(values.addressId);
      navigate(checkoutActionRoutes.paymentMethod);
    }
  };

  useEffect(() => {
    const newAddressId = location.state?.addressId;
    if (newAddressId) {
      updateCheckoutAddress(newAddressId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasContent = addresses.isSuccess && addresses.data?.length > 0;
  const isEmpty = addresses.isSuccess && addresses.data?.length === 0;

  return (
    <main className="container flex max-w-5xl flex-col">
      <section className="mt-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Checkout - Shipping
        </h1>
        <p className="mt-1 leading-tight">
          How do you want to receive or withdraw your purchase?
        </p>
      </section>

      <section className="mt-4 h-full">
        <h2 className="text-base leading-tight text-muted-foreground">
          Select an address to continue
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-2 flex h-full gap-4"
          >
            <div className="grow space-y-4">
              {addresses.isLoading && (
                <Card>
                  <div className="divide-y divide-black/10">
                    <AddressItem.Skeleton />
                    <AddressItem.Skeleton />
                    <AddressItem.Skeleton />
                    <AddressItem.Skeleton />
                  </div>
                </Card>
              )}
              {addresses.isError && (
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
                  <EmptyPlaceholder.Title>
                    Error fetching addresses
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                    An error occurred while fetching addresses. Please try
                    again.
                  </EmptyPlaceholder.Description>
                  <Button
                    className="mt-4"
                    size="lg"
                    type="button"
                    onClick={() => addresses.refetch()}
                  >
                    Try again
                  </Button>
                </EmptyPlaceholder>
              )}
              {isEmpty && (
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon icon={InboxIcon} />
                  <EmptyPlaceholder.Title>
                    No addresses found
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                    Start creating one.
                  </EmptyPlaceholder.Description>
                  <Button asChild>
                    <Link
                      to={addressActionRoutes.new}
                      state={{
                        from: checkoutActionRoutes.shipping,
                      }}
                    >
                      New Address
                    </Link>
                  </Button>
                </EmptyPlaceholder>
              )}
              {hasContent && (
                <FormField
                  control={form.control}
                  name="addressId"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage className="mb-1 mt-0" />
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={addressId}
                          value={field.value}
                          className="flex flex-col gap-1"
                        >
                          <Card className="divide-y divide-black/10">
                            <FormItem className="flex items-center gap-4 p-4">
                              <FormControl className="shrink-0">
                                <RadioGroupItem value="new" />
                              </FormControl>
                              <FormLabel className="mb-0 grow">
                                New Address
                              </FormLabel>
                            </FormItem>
                            {addresses.data.map((address) => (
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
    </main>
  );
};

export default CheckoutShipping;
