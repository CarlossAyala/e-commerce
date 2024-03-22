import { useSearchParams } from "react-router-dom";
import {
  DocumentIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { ProductCard } from "@/apps/customer/components";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  Pagination,
} from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "@/components";
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
    <main className="container space-y-6">
      <section className="flex justify-between">
        <PageHeader>
          <PageHeaderHeading>Bookmarks</PageHeaderHeading>
          <PageHeaderDescription>
            Bookmarks are saved products you want to see again.
          </PageHeaderDescription>
        </PageHeader>

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
        <section className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <ProductCard.Skeleton count={3} />
        </section>
      ) : isError ? (
        <EmptyState
          icon={ExclamationTriangleIcon}
          title="Error"
          description={error.message}
        />
      ) : isEmpty ? (
        <EmptyState
          icon={DocumentIcon}
          title="No bookmarks"
          description="No bookmarks found"
        />
      ) : (
        <section className="grid grid-cols-products gap-4">
          {bookmarks.rows.map((bookmark) => (
            <div key={bookmark.productId} className="relative">
              <ProductCard product={bookmark.product} />
              <Button
                variant="outline"
                size="icon"
                type="button"
                className="absolute right-2 top-2 bg-background shadow-md backdrop-blur"
                disabled={removeBookmark.isLoading}
                onClick={() => handleRemove(bookmark.productId)}
              >
                <XMarkIcon className="size-4" />
              </Button>
            </div>
          ))}
        </section>
      )}

      <Pagination count={bookmarks?.count} />
    </main>
  );
};
