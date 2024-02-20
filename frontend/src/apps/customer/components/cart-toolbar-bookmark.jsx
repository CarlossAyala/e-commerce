import { ExclamationCircleIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "../../../components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../features/bookmark";
import { cn } from "../../../libs/utils";
import { toast } from "sonner";

export const CartToolbarBookmark = ({ item }) => {
  const { bookmark, isLoading, isError } = useGetBookmark(item.productId);
  const add = useCreateBookmark();
  const remove = useRemoveBookmark();

  const handleBookmark = () => {
    if (bookmark) {
      remove.mutate(item.productId, {
        onSuccess() {
          toast("Bookmark removed");
        },
        onError(error) {
          toast.message("Bookmark remove failed", {
            description: error.message,
          });
        },
        onSettled() {
          remove.reset();
        },
      });
    } else {
      add.mutate(item.productId, {
        onSuccess() {
          toast({
            description: "Bookmark added",
          });
        },
        onError() {
          toast({
            variant: "destructive",
            description: "Bookmark add failed",
          });
        },
        onSettled() {
          add.reset();
        },
      });
    }
  };

  const isDisable = isLoading || isError || add.isLoading || remove.isLoading;

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="group h-8 w-8 p-0"
      disabled={isDisable}
      onClick={handleBookmark}
    >
      {isLoading ? (
        <Spinner className="size-6" />
      ) : isError ? (
        <ExclamationCircleIcon className="size-6" />
      ) : (
        <HeartIcon
          className={cn(
            "size-6 group-hover:text-red-600",
            bookmark && "text-red-600",
          )}
        />
      )}
    </Button>
  );
};
