import { ExclamationCircleIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Button, Spinner, useToast } from "../../../components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../features/bookmark";
import { cn } from "../../../libs/utils";

export const CartToolbarBookmark = ({ item }) => {
  const { toast } = useToast();
  const { bookmark, isLoading, isError } = useGetBookmark(item.productId);
  const add = useCreateBookmark();
  const remove = useRemoveBookmark();

  const isDisable = isLoading || isError || add.isLoading || remove.isLoading;
  const handleBookmark = () => {
    if (bookmark) {
      remove.mutate(item.productId, {
        onSuccess() {
          toast({
            description: "Bookmark removed",
          });
        },
        onError() {
          toast({
            variant: "destructive",
            description: "Bookmark remove failed",
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
