import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDebounced } from "@/shared/hooks";
import { useUpdateQuantity } from "../features/cart";
import { Spinner } from "@/shared/components";

export const CartItemQty = ({ item }) => {
  const [qty, setQty] = useState(item.quantity);
  const debounce = useDebounced(qty, 300);
  const { mutate, isLoading } = useUpdateQuantity();

  const handleChange = (e) => {
    const { value } = e.target;
    if (!value || Number.isNaN(value) || +value === 0) return setQty("");

    setQty(+value);
  };

  const handleDecrement = () => {
    if (qty <= 1) return;

    setQty(qty - 1);
  };
  const handleIncrement = () => {
    if (qty >= item.product.stock) return;

    setQty(qty + 1);
  };

  useEffect(() => {
    if (!debounce) return;
    if (debounce === item.quantity) return;
    if (debounce < 1) return;
    if (debounce > item.product.stock) return;

    mutate({ productId: item.productId, quantity: debounce });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  const isMin = qty <= 1;
  const isMax = qty >= item.product.stock;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 rounded border">
          <button
            type="button"
            className="p-1.5 disabled:opacity-50"
            disabled={isMin}
            onClick={handleDecrement}
          >
            <MinusIcon className="size-4" />
          </button>
          <input
            type="text"
            className="h-7 w-14 bg-transparent text-center"
            value={qty}
            onChange={handleChange}
          />
          <button
            type="button"
            className="p-1.5 disabled:opacity-50"
            disabled={isMax}
            onClick={handleIncrement}
          >
            <PlusIcon className="size-4" />
          </button>
        </div>
        {isLoading && <Spinner className="size-5" />}
      </div>
      {!qty ? (
        <div>
          <p className="text-xs text-red-600">You can buy from 1 u.</p>
        </div>
      ) : qty > item.product.stock ? (
        <div>
          <p className="text-xs text-red-600">Exceeds available units</p>
        </div>
      ) : null}
    </div>
  );
};
