import { useAuth } from "@/shared/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { addToCartInitial, addToCartSchema, useAddCart } from "../../cart";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Spinner,
} from "@/components";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export const AddToCart = ({ product }) => {
  const { isAuthenticated } = useAuth();
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

    addToCart.mutate(
      { productId: product.id, quantity: values },
      {
        onSuccess() {
          toast("Product added to cart");
        },
      },
    );
  };

  const hasStock = product.stock > 0;

  return (
    <>
      {!product.available ? (
        <Button size="lg" type="button" className="w-full" disabled>
          Not available
        </Button>
      ) : !hasStock ? (
        <Button size="lg" type="button" className="w-full" disabled>
          Out of stock
        </Button>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddToCart)}
            className="w-full"
          >
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
                disabled={addToCart.isLoading}
              >
                {addToCart.isLoading ? (
                  <Spinner className="mr-2 size-5" />
                ) : (
                  <ShoppingCartIcon className="mr-2 size-5" />
                )}
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
      )}
    </>
  );
};
