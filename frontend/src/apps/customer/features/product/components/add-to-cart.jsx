import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addCartInitial, addCartSchema, useAddCart } from "../../cart";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  useToast,
} from "../../../../../components";

export const AddToCart = ({ product, stock }) => {
  const { toast } = useToast();

  const addToCart = useAddCart();

  const form = useForm({
    resolver: yupResolver(addCartSchema(stock)),
    defaultValues: addCartInitial(stock),
    mode: "all",
  });

  const onSubmit = (quantity) => {
    addToCart.mutate([product.id, quantity], {
      onSuccess() {
        toast({
          description: "Product added to cart",
        });
        addToCart.reset();
      },
      onError(error) {
        toast({
          title: "Product could not be added to cart",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
        addToCart.reset();
      },
    });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={addToCart.isLoading}
                  type="number"
                  className="h-10"
                  placeholder="Quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full text-base"
          size="lg"
          type="submit"
          disabled={addToCart.isLoading}
        >
          Add to cart
        </Button>
      </form>
    </Form>
  );
};
