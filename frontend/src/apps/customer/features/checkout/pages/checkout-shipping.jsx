import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
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
} from "../../../../../components";
import { useGetAddresses } from "../../address";
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

const CheckoutShipping = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const checkoutStore = useCheckoutStore();
  const updateCheckoutAddress = useUpdateCheckoutAddress();

  const addresses = useGetAddresses();
  const cart = useGetCart("only_visible=true");

  const form = useForm({
    resolver: yupResolver(checkoutAddressSchema),
    defaultValues: checkoutAddressInitial,
    values: checkoutAddressDefault(checkoutStore.addressId),
    mode: "all",
  });

  const handleSubmit = (values) => {
    updateCheckoutAddress(values.addressId);
    navigate(checkoutActionRoutes.paymentMethod);
  };

  useEffect(() => {
    const addressId = location.state?.addressId;
    if (addressId) {
      form.setValue("addressId", addressId);
      updateCheckoutAddress(addressId);
    }
  }, [form, location.state?.addressId, updateCheckoutAddress]);

  return (
    <MainContent className="flex max-w-5xl flex-col">
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
              {addresses.isError && <p>Error fetching addresses</p>}
              {addresses.isSuccess && (
                <>
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
                            <Card className="divide-y divide-black/10">
                              {addresses.data.map((address) => (
                                <FormItem
                                  key={address.id}
                                  className="flex items-center gap-4 px-4 py-3"
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
                  <CartSummary cart={cart.data} />
                </Card>
              )}
            </div>
          </form>
        </Form>
      </section>
    </MainContent>
  );
};

export default CheckoutShipping;
