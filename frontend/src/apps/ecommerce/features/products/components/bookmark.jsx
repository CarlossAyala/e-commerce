import { BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/features/auth";
import { Spinner } from "@/shared/components";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components";
import {
  useCreateBookmark,
  useGetBookmark,
  useRemoveBookmark,
} from "../../bookmark";

export const Bookmark = ({ product }) => {
  const { data } = useAuth();
  const isAuthenticated = !!data;

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            type="button"
            variant="outline"
            disabled={bookmark.isLoading || add.isLoading || remove.isLoading}
            onClick={handleBookmark}
          >
            <span className="sr-only">Bookmark product</span>
            {!isAuthenticated ? (
              <OutlineBookmarkIcon className="size-5 text-primary" />
            ) : bookmark.isLoading ? (
              <Spinner className="size-5" />
            ) : bookmark.data ? (
              <SolidBookmarkIcon className="size-5 text-primary" />
            ) : (
              <OutlineBookmarkIcon className="size-5 text-primary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          Bookmark product
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
