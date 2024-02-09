import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRemoveFromCart } from "../features/cart";
import { Button, Spinner, useToast } from "../../../components";

export const CartToolbarRemove = ({ item }) => {
  const { toast } = useToast();
  const { mutate, reset, isLoading, isError } = useRemoveFromCart();

  const handleRemove = () => {
    mutate(item.productId, {
      onSuccess() {
        toast({
          description: "Cart product removed",
        });
      },
      onError() {
        toast({
          variant: "destructive",
          description: "Cart product remove failed",
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
