import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDocumentTitle } from "@/shared/hooks";
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
} from "@/components";
import { useGetCart } from "../../cart/queries";
import { addressActionRoutes, useGetAddresses } from "../../address";
import {
  checkoutAddressDefault,
  checkoutAddressInitial,
  checkoutAddressSchema,
} from "../schemas";
import { AddressItem } from "../components/address-item";
import { checkoutActionRoutes } from "../utils";
import { useCheckout } from "../context";

export const CheckoutShipping = () => {
  useDocumentTitle("Checkout - Shipping");
  const { paymentIntentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addressId, updateAddress } = useCheckout();

  const {
    data: addresses,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAddresses();
  const cart = useGetCart();

  const form = useForm({
    resolver: yupResolver(checkoutAddressSchema),
    defaultValues: checkoutAddressInitial,
    values: checkoutAddressDefault(addressId),
    mode: "all",
  });

  const handleNext = (values) => {
    if (values.addressId === "new") {
      navigate(addressActionRoutes.new, {
        state: {
          from: checkoutActionRoutes.shipping(paymentIntentId),
        },
      });
    } else {
      updateAddress(values.addressId);
      navigate(checkoutActionRoutes.paymentMethod(paymentIntentId));
    }
  };

  useEffect(() => {
    const newAddressId = location.state?.addressId;
    if (newAddressId) {
      updateAddress(newAddressId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmpty = addresses?.length === 0;

  return (
    <main className="container flex max-w-6xl flex-1 flex-col space-y-4">
      <section className="mt-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          Checkout - Shipping
        </h2>
        <p className="leading-tight">
          How do you want to receive or withdraw your purchase?
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base leading-tight text-muted-foreground">
          Select an address to continue
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNext)}
            className="grid-cols-8 gap-6 md:grid"
          >
            {isLoading ? (
              <Card className="divide-y divide-black/10 md:col-span-5">
                <AddressItem.Skeleton />
                <AddressItem.Skeleton />
                <AddressItem.Skeleton />
              </Card>
            ) : isError ? (
              <EmptyPlaceholder
                title="Error"
                description={error.message}
                className="md:col-span-5"
              >
                <Button
                  className="mt-4"
                  size="lg"
                  type="button"
                  onClick={refetch}
                >
                  Try again
                </Button>
              </EmptyPlaceholder>
            ) : isEmpty ? (
              <EmptyPlaceholder
                title="No addresses found"
                description="Start creating one."
                className="md:col-span-5"
              >
                <Button asChild className="mt-4">
                  <Link
                    to={addressActionRoutes.new}
                    state={{
                      from: checkoutActionRoutes.shipping(paymentIntentId),
                    }}
                  >
                    Create
                  </Link>
                </Button>
              </EmptyPlaceholder>
            ) : (
              <FormField
                control={form.control}
                name="addressId"
                render={({ field }) => (
                  <FormItem className="md:col-span-5">
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
