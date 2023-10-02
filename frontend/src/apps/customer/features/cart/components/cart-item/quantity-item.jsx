import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Input, useToast } from "../../../../../../components";
import { useUpdateQuantity } from "../../queries";
import { useDebounced, useUpdateEffect } from "../../../../../../hooks";
import { addCartSchema } from "../../schemas";

export const QuantityItem = ({ item }) => {
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(item.quantity);
  const update = useUpdateQuantity();

  const { toast } = useToast();

  const debouncedQuantity = useDebounced(quantity);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  const hasStock = item.product.stock > 0;
  const isAvailable = item.product.available;

  const isMax = quantity === item.product.stock;
  const isMin = quantity <= 1;

  const disableIncrement = isMax || update.isLoading;
  const disableDecrement = isMin || update.isLoading;

  const updateQuantity = async () => {
    try {
      const schema = addCartSchema(item.product.stock);
      const validQuantity = await schema.validate({
        quantity: debouncedQuantity,
      });
      update.mutate([item.id, validQuantity.quantity], {
        onSuccess() {
          setError("");
        },
        onError(error) {
          toast({
            variant: "destructive",
            title: "Quantity could not be updated",
            description: error?.message ?? "Uh oh! Something went wrong.",
          });
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useUpdateEffect(() => {
    updateQuantity();
  }, [debouncedQuantity]);

  if (!hasStock || !isAvailable) {
    return (
      <p className="text-sm text-muted-foreground">
        {!hasStock && "Out of stock"}
        {!hasStock && !isAvailable && " | "}
        {!isAvailable && "Unavailable"}
      </p>
    );
  }

  return (
    <div className="max-w-[160px]">
      <div className="flex items-center gap-x-1">
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={decrement}
          disabled={disableDecrement}
          className="h-9 w-9 shrink-0 p-0"
        >
          <MinusIcon className="h-5 w-5 shrink-0" />
        </Button>

        <Input
          type="number"
          value={quantity}
          onChange={(event) => {
            const value = event.target.value;

            setQuantity(value);
          }}
        />

        <Button
          variant="outline"
          type="button"
          size="icon"
          className="h-9 w-9 shrink-0 p-0"
          onClick={increment}
          disabled={disableIncrement}
        >
          <PlusIcon className="h-5 w-5" />
        </Button>
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
};
