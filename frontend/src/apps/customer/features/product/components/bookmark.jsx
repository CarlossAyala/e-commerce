import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/shared/auth";
import { Button, Spinner } from "@/components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../../bookmark";

export const Bookmark = ({ product }) => {
  const { isAuthenticated } = useAuth();

  const productId = product.id;
  const bookmark = useGetBookmark(productId);
  const add = useCreateBookmark();
  const remove = useRemoveBookmark();

  const handleBookmark = () => {
    if (!isAuthenticated) {
      alert("Please login to bookmark this product");
      return;
    }

    if (bookmark.data) {
      remove.mutate(productId);
    } else {
      add.mutate(productId);
    }
  };

  return (
    <Button
      size="icon"
      type="button"
      variant="outline"
      disabled={bookmark.isLoading || add.isLoading || remove.isLoading}
      onClick={handleBookmark}
    >
      {!isAuthenticated ? (
        <OutlineBookmarkIcon className="size-5" />
      ) : bookmark.isLoading ? (
        <Spinner className="size-5" />
      ) : bookmark.data ? (
        <SolidBookmarkIcon className="size-5" />
      ) : (
        <OutlineBookmarkIcon className="size-5" />
      )}
    </Button>
  );
};
