import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components";
import { cn } from "../../../libs/utils";
import { useUpdateVisibility } from "../features/cart";

export const CartToolbarView = ({ item }) => {
  const updater = useUpdateVisibility();

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className={cn(
        "h-8 w-8 p-0 hover:text-blue-600",
        !item.visible && "text-blue-600",
      )}
      onClick={() => updater(item.productId)}
    >
      {item.visible ? (
        <EyeIcon className="size-6" />
      ) : (
        <EyeSlashIcon className="size-6" />
      )}
    </Button>
  );
};
