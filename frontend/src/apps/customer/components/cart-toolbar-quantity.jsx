import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "../../../components";
import { useEffect, useState } from "react";
import { useDebounced } from "../../../hooks";
import { useUpdateQuantity } from "../features/cart";

const MIN_QUANTITY = 1;
export const CartToolbarQuantity = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const debounced = useDebounced(quantity);

  const { mutate } = useUpdateQuantity();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (!value) return setQuantity("");

    setQuantity(+value);
  };

  useEffect(() => {
    if (!debounced) return;
    else if (debounced === item.quantity) return;
    else if (debounced < MIN_QUANTITY) return;
    else if (debounced > item.stock) return;

    mutate({ productId: item.productId, quantity: debounced });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const max = item.stock;
  const isMin = quantity <= 1;
  const isMax = quantity >= item.product.stock;

  return (
    <div className="flex justify-between overflow-hidden rounded-md border">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-none border-0 p-0 shadow-none"
        disabled={isMin}
        onClick={handleDecrement}
      >
        <MinusIcon className="size-5 text-gray-600 sm:size-6" />
      </Button>
      <Input
        type="number"
        className="h-8 w-full max-w-14 border-0 p-0 text-center text-base shadow-none focus-visible:ring-0"
        value={quantity}
        min={MIN_QUANTITY}
        max={max}
        onChange={handleChange}
      />
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-none border-0 p-0 shadow-none"
        disabled={isMax}
        onClick={handleIncrement}
      >
        <PlusIcon className="size-5 text-gray-600 sm:size-6" />
      </Button>
    </div>
  );
};
