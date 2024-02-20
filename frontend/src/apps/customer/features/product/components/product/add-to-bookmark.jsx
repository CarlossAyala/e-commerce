import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "../../../../../../components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../../../bookmark";
import { toast } from "sonner";

const AddToBookmarkSkeleton = () => {
  return <Skeleton className="h-8 w-32" />;
};

export const AddToBookmark = ({ productId }) => {
  const bookmark = useGetBookmark(productId);
  const add = useCreateBookmark();
  const remove = useRemoveBookmark();

  const handleBookmark = () => {
    if (bookmark.data) {
      remove.mutate(productId, {
        onSuccess() {
          toast("Product removed from bookmark");
        },
        onError(error) {
          toast.message("Product could not be removed from bookmark", {
            description: error.message,
          });
        },
      });
      remove.reset();
    } else {
      add.mutate(productId, {
        onSuccess() {
          toast("Product added to bookmark");
        },
        onError(error) {
          toast.message("Product could not be added to bookmark", {
            description: error.message,
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
