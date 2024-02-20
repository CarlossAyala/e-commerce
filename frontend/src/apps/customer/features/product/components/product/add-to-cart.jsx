import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "../../../../../../components";
import { addCartInitial, addCartSchema, useAddCart } from "../../../cart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export const AddToCart = ({ product }) => {
  const addToCart = useAddCart();

  const form = useForm({
    resolver: yupResolver(addCartSchema(product.stock)),
    defaultValues: addCartInitial(product.stock),
    mode: "all",
  });

  const onSubmit = (quantity) => {
    addToCart.mutate(
      { productId: product.id, quantity },
      {
        onSuccess() {
          toast({
            description: "Product added to cart",
          });
          addToCart.reset();
        },
        onError(error) {
          toast({
            title: "Product could not be added to cart",
            description: error.message,
          });
          addToCart.reset();
        },
      },
    );
  };

  const hasStock = product.stock > 0;
  const isAvailable = product.available;

  if (!hasStock || !isAvailable) {
    return (
      <div className="rounded-md border border-dashed py-4">
        <p className="text-center text-base leading-tight text-muted-foreground">
          {!hasStock && "Out of stock"}
          {!isAvailable && "Not available"}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={addToCart.isLoading}
                  type="number"
                  className="h-10 w-24"
                  placeholder="Quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="grow gap-x-2 text-sm"
          size="lg"
          type="submit"
          disabled={addToCart.isLoading}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Add to cart
        </Button>
      </form>
    </Form>
  );
};
