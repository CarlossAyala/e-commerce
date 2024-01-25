import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { AddressItem } from "../components/address-item";
import { useGetCart } from "../../cart/queries";
import { CartSummary } from "../components/cart-summary";
import { checkoutActionRoutes } from "../utils";
import { useCheckout } from "../context";

const CheckoutShipping = () => {
  const { paymentIntentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addressId, updateAddress } = useCheckout();

  const {
    data: addresses,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetAddresses();
  const cart = useGetCart("only_visible=true");

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

  const isEmpty = isSuccess && addresses.length === 0;

  return (
    <main className="container flex max-w-6xl flex-col space-y-4">
      <section className="mt-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Checkout - Shipping
        </h1>
        <p className="mt-1 leading-tight">
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
            className="flex flex-col gap-4 sm:flex-row"
          >
            {isLoading ? (
              <Card className="grow divide-y divide-black/10">
                <AddressItem.Skeleton />
                <AddressItem.Skeleton />
                <AddressItem.Skeleton />
              </Card>
            ) : isError ? (
              <EmptyPlaceholder
                title="Error"
                description={error.message}
                className="grow"
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
                className="grow"
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
                  <FormItem className="grow">
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
                    <Button className="mt-4 w-full" size="lg" type="submit">
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

export default CheckoutShipping;
