import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, useToast } from "../../../../../components";
import { useUpdateVisibility } from "../queries";

export const VisibilityItem = ({ item }) => {
  const { toast } = useToast();

  const visibility = useUpdateVisibility();

  const handleVisibility = () => {
    visibility.mutate(item.id, {
      onError(error) {
        toast({
          title: "Product visibility could not be updated",
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
      onClick={handleVisibility}
      disabled={visibility.isLoading}
    >
      {item.visible ? (
        <EyeIcon className="h-5 w-5" />
      ) : (
        <EyeSlashIcon className="h-5 w-5" />
      )}
    </Button>
  );
};
