import { useSearchParams } from "react-router-dom";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyPlaceholder,
  Pagination,
} from "@/components";
import {
  useClearBookmark,
  useGetBookmarks,
  useRemoveBookmark,
} from "../queries";
import { ProductCard } from "@/apps/customer/components";

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
    <main className="container space-y-4">
      <section className="mt-3 flex gap-4">
        <div className="scroll-m-20">
          <h1 className="text-3xl font-semibold tracking-tight">Bookmarks</h1>
          <p className="mt-1 leading-tight text-muted-foreground">
            Bookmarks are saved products you want to see again.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto shrink-0" size="icon">
              <EllipsisVerticalIcon className="h-5 w-5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onSelect={handleClear}
              disabled={isLoading || isEmpty || isError}
            >
              Clear bookmarks
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {isLoading ? (
        <section className="grid grid-cols-products gap-4">
          <ProductCard.Skeleton />
        </section>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No bookmarks"
          description="Start browsing products and bookmark them to save them for later"
        />
      ) : (
        <section className="grid grid-cols-products gap-4">
          {bookmarks.rows.map((bookmark) => (
            <div key={bookmark.product.id} className="relative">
              <ProductCard product={bookmark.product} />
              <Button
                variant="outline"
                size="icon"
                type="button"
                className="absolute right-2 top-2 bg-white shadow-md"
                onClick={() => handleRemove(bookmark.product.id)}
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </section>
      )}

      <Pagination totalRows={bookmarks?.count} />
    </main>
  );
};
