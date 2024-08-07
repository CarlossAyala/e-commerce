import { useSearchParams } from "react-router-dom";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { ProductCard } from "@/apps/ecommerce/components";
import {
  EmptyState,
  PageHeaderDescription,
  PageHeaderHeading,
  URLPagination,
  Spinner,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components";
import {
  useClearBookmark,
  useGetBookmarks,
  useRemoveBookmark,
} from "../queries";

export const Bookmarks = () => {
  useDocumentTitle("Bookmarks");
  const [params] = useSearchParams();
  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
  } = useGetBookmarks(params.toString());

  const clearBookmark = useClearBookmark();
  const removeBookmark = useRemoveBookmark();

  const handleClear = () => {
    clearBookmark.mutate(null, {
      onSuccess: () => {
        toast("Bookmark cleared");
      },
    });
  };

  const handleRemove = (productId) => {
    removeBookmark.mutate(productId, {
      onSuccess: () => {
        toast("Bookmark removed");
      },
    });
  };

  const isEmpty = bookmarks?.rows.length === 0;

  return (
    <main className="container flex-1 space-y-4 pb-10">
      <section className="mt-4 flex justify-between gap-4">
        <div>
          <PageHeaderHeading>Bookmarks</PageHeaderHeading>
          <PageHeaderDescription>
            Bookmarks are saved products you want to see again.
          </PageHeaderDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto shrink-0">
              <EllipsisVerticalIcon className="size-5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onSelect={handleClear}
              disabled={isLoading || isEmpty}
            >
              {isLoading && <Spinner className="size-4" />}
              Clear bookmarks
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {isLoading ? (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </section>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyState title="No bookmarks" description="No bookmarks yet" />
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {bookmarks.rows.map((bookmark) => (
            <div key={bookmark.productId} className="relative">
              <ProductCard product={bookmark.product} />
              <Button
                variant="outline"
                size="icon"
                type="button"
                className="absolute right-2 top-2 bg-background"
                disabled={removeBookmark.isLoading}
                onClick={() => handleRemove(bookmark.productId)}
              >
                <XMarkIcon className="size-4" />
              </Button>
            </div>
          ))}
        </section>
      )}

      <URLPagination count={bookmarks?.count} />
    </main>
  );
};
