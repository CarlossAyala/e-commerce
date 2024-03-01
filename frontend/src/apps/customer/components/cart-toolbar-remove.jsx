import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useRemoveFromCart } from "../features/cart";
import { Button, Spinner } from "@/components";

export const CartToolbarRemove = ({ item }) => {
  const { mutate, reset, isLoading, isError } = useRemoveFromCart();

  const handleRemove = () => {
    mutate(item.productId, {
      onSuccess() {
        toast("Cart product removed");
      },
      onError(error) {
        toast.message("Cart product remove failed", {
          description: error.message,
        });
      },
      onSettled() {
        reset();
      },
    });
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="h-8 w-8 p-0"
      disabled={isLoading}
      onClick={handleRemove}
    >
      {isLoading ? (
        <Spinner className="size-6" />
      ) : isError ? (
        <ExclamationCircleIcon className="size-6" />
      ) : (
        <XMarkIcon className="size-6" />
      )}
    </Button>
  );
};
