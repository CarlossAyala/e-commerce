import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, useToast } from "../../../../../components";
import { useRemoveCart } from "../queries";

export const RemoveItem = ({ item }) => {
  const { toast } = useToast();

  const remove = useRemoveCart();

  const handleRemove = () => {
    remove.mutate(item.id, {
      onSuccess() {
        toast({
          description: "Product removed from cart",
        });
      },
      onError(error) {
        toast({
          title: "Product could not be removed",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 p-0"
      type="button"
      onClick={handleRemove}
      disabled={remove.isLoading}
    >
      <XMarkIcon className="h-5 w-5" />
    </Button>
  );
};
