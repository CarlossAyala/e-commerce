import { Button, Skeleton, useToast } from "../../../../../components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../../bookmark";

const AddToBookmarkSkeleton = () => {
  return <Skeleton className="h-10 w-full" />;
};

export const AddToBookmark = ({ productId }) => {
  const { toast } = useToast();
  const bookmark = useGetBookmark(productId);
  const add = useCreateBookmark();
  const remove = useRemoveBookmark();

  const handleBookmark = () => {
    if (bookmark.data) {
      remove.mutate(productId, {
        onSuccess() {
          toast({
            description: "Product removed from bookmark",
          });
        },
        onError(error) {
          toast({
            title: "Product could not be removed from bookmark",
            description: error?.message ?? "Uh oh! Something went wrong.",
          });
        },
      });
      remove.reset();
    } else {
      add.mutate(productId, {
        onSuccess() {
          toast({
            description: "Product added to bookmark",
          });
        },
        onError(error) {
          toast({
            title: "Product could not be added to bookmark",
            description: error?.message ?? "Uh oh! Something went wrong.",
          });
        },
      });
      add.reset();
    }
  };

  if (bookmark.isLoading) {
    return <AddToBookmarkSkeleton />;
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleBookmark}
      disabled={add.isLoading || remove.isLoading}
    >
      {bookmark.data ? "Remove from bookmark" : "Add to bookmark"}
    </Button>
  );
};

AddToBookmark.Skeleton = AddToBookmarkSkeleton;
