import { XMarkIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@/shared/components";
import { useRemoveFromCart } from "../features/cart";

export const CartItemRemove = ({ productId }) => {
  const { mutate, isLoading } = useRemoveFromCart();

  const handleRemove = () => {
    mutate(productId);
  };

  return (
    <button
      className="rounded border p-1.5"
      disabled={isLoading}
      onClick={handleRemove}
    >
      {isLoading ? (
        <Spinner className="size-4" />
      ) : (
        <XMarkIcon className="size-4" />
      )}
    </button>
  );
};
