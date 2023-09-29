import { useSearchParams } from "react-router-dom";
import {
  Button,
  EmptyPlaceholder,
  MainContent,
  TablePagination,
  useToast,
} from "../../../../../components";
import {
  useClearBookmark,
  useGetBookmarks,
  useRemoveBookmark,
} from "../queries";
import { useDebounced } from "../../../../../hooks";
import { ProductItem } from "../../../components";
import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Bookmark = () => {
  const { toast } = useToast();
  const [params] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());
  const bookmarks = useGetBookmarks(debouncedParams);

  const clearBookmark = useClearBookmark();
  const removeBookmark = useRemoveBookmark();

  const handlerClear = () => {
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

  const hasContent = bookmarks.isSuccess && bookmarks.data?.rows.length > 0;
  const isEmpty = bookmarks.isSuccess && bookmarks.data?.rows.length === 0;

  console.log("Bookmarks", bookmarks);

  return (
    <MainContent className="space-y-4">
      <section className="mt-3 justify-between sm:flex">
        <div className="scroll-m-20">
          <h1 className="text-3xl font-semibold tracking-tight">Bookmarks</h1>
          <p className="mt-1 leading-tight text-muted-foreground">
            Bookmarks are saved products you want to see again.
          </p>
        </div>
        <section className="mt-3 text-end sm:mt-1">
          <Button onClick={handlerClear}>Clear Bookmarks</Button>
        </section>
      </section>

      {bookmarks.isLoading ? (
        <div className="w- grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
        </div>
      ) : (
        <>
          {bookmarks.isError && (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
              <EmptyPlaceholder.Title>
                Error fetching bookmarks
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                An error occurred while fetching bookmarks. Please try again
                later.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
          {isEmpty && (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
              <EmptyPlaceholder.Title>
                No bookmarks found.
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Start browsing products and bookmark them to save them for
                later.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
          {hasContent && (
            <div className="w- grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
              {bookmarks.data.rows.map((bookmark) => (
                <div key={bookmark.product.id} className="relative">
                  <ProductItem product={bookmark.product} />
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
            </div>
          )}
        </>
      )}

      <TablePagination totalRows={bookmarks.data?.count} />
    </MainContent>
  );
};

export default Bookmark;
