import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { Skeleton } from "@/components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../../../bookmark";

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
        onSettled() {
          remove.reset();
        },
      });
    } else {
      add.mutate(productId, {
        onSuccess() {
          toast("Product added to bookmark");
        },
        onSettled() {
          add.reset();
        },
      });
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
        <SolidBookmarkIcon className="mr-1 size-5" />
      ) : (
        <OutlineBookmarkIcon className="mr-1 size-5" />
      )}
      Bookmark
    </button>
  );
};

AddToBookmark.Skeleton = AddToBookmarkSkeleton;
