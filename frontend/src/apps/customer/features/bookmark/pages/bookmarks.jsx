import { useSearchParams } from "react-router-dom";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyPlaceholder,
  Pagination,
  useToast,
} from "../../../../../components";
import {
  useClearBookmark,
  useGetBookmarks,
  useRemoveBookmark,
} from "../queries";
import { useDebounced, useDocumentTitle } from "../../../../../hooks";
import { ProductCard } from "../../../components";

export const Bookmarks = () => {
  const { toast } = useToast();
  const [params] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());
  const {
    data: bookmarks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBookmarks(debouncedParams);

  useDocumentTitle("Bookmarks");

  const clearBookmark = useClearBookmark();
  const removeBookmark = useRemoveBookmark();

  const handleClear = () => {
    clearBookmark.mutate(null, {
      onSuccess: () => {
        toast({
          description: "Bookmark cleared",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Bookmarks could not be cleared",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const handleRemove = (productId) => {
    removeBookmark.mutate(productId, {
      onSuccess: () => {
        toast({
          description: "Bookmark removed",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Bookmark could not be removed",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const isEmpty = isSuccess && bookmarks?.rows.length === 0;

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
        <EmptyPlaceholder
          title={error?.name ?? "Error"}
          description={error?.message ?? "Uh oh! Something went wrong."}
        />
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
