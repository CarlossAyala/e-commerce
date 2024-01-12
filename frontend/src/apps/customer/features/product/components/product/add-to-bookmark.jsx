import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { Skeleton, useToast } from "../../../../../../components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../../../bookmark";

const AddToBookmarkSkeleton = () => {
  return <Skeleton className="h-8 w-32" />;
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
    <button
      className="flex items-center text-muted-foreground"
      onClick={handleBookmark}
      disabled={add.isLoading || remove.isLoading}
    >
      {bookmark.data ? (
        <SolidBookmarkIcon className="mr-1 h-5 w-5" />
      ) : (
        <OutlineBookmarkIcon className="mr-1 h-5 w-5" />
      )}
      Bookmark
    </button>
  );
};

AddToBookmark.Skeleton = AddToBookmarkSkeleton;
