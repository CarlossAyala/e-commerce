import { useAuth } from "@/features/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "@/shared/components";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/shared/components";
import { addToCartInitial, addToCartSchema, useAddCart } from "../../cart";

export const AddToCart = ({ product }) => {
  const { data, isLoading } = useAuth();
  const isAuthenticated = !!data;

  const addToCart = useAddCart();

  const form = useForm({
    resolver: yupResolver(addToCartSchema(product.stock)),
    defaultValues: addToCartInitial(),
    mode: "onSubmit",
  });

  const handleAddToCart = (values) => {
    if (!isAuthenticated) {
      alert("Please login to add this product to cart");
      return;
    }

    addToCart.mutate({ productId: product.id, quantity: values });
  };

  const hasStock = product.stock > 0;

  return !product.available ? (
    <Button size="lg" type="button" className="w-full" disabled>
      Not available
    </Button>
  ) : !hasStock ? (
    <Button size="lg" type="button" className="w-full" disabled>
      Out of stock
    </Button>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddToCart)} className="w-full">
        <div className="grid w-full grid-cols-6 gap-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Qty"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            size="lg"
            type="submit"
            className="col-span-4"
            disabled={addToCart.isLoading || isLoading}
          >
            {addToCart.isLoading && <Spinner className="mr-2 size-4" />}
            Add to cart
          </Button>
        </div>

        <FormField
          control={form.control}
          name="quantity"
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
