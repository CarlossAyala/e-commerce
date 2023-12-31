import { useSearchParams } from "react-router-dom";
import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  EmptyPlaceholder,
  MainContent,
  TablePagination,
  useToast,
} from "../../../../../components";
import { useClearHistory, useGetHistory } from "../queries";
import { useDebounced } from "../../../../../hooks";
import { ProductCard } from "../../../components/";

const History = () => {
  const { toast } = useToast();
  const [params] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());
  const history = useGetHistory(debouncedParams);

  const clearHistory = useClearHistory();

  const handleClearHistory = () => {
    clearHistory.mutate(null, {
      onSuccess: () => {
        toast({
          description: "History cleared",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "History could not be cleared",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const hasContent = history.isSuccess && history.data?.rows.length > 0;
  const isEmpty = history.isSuccess && history.data?.rows.length === 0;

  console.log("History", history);

  return (
    <MainContent className="space-y-4">
      <section className="mt-3 justify-between sm:flex">
        <div className="scroll-m-20">
          <h1 className="text-3xl font-semibold tracking-tight">History</h1>
          <p className="mt-1 leading-tight text-muted-foreground">
            Here is the history of products that you viewed.
          </p>
        </div>
        <section className="mt-3 text-end sm:mt-1">
          <Button onClick={handleClearHistory}>Clear History</Button>
        </section>
      </section>

      {history.isLoading ? (
        <div className="w- grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </div>
      ) : (
        <>
          {history.isError && (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
              <EmptyPlaceholder.Title>
                Error fetching history
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                An error occurred while fetching history. Please try again
                later.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
          {isEmpty && (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
              <EmptyPlaceholder.Title>No history yet</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You haven&apos;t viewed any product yet.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
          {hasContent && (
            <div className="w- grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
              {history.data.rows.map((_history) => (
                <ProductCard key={_history.id} product={_history.product} />
              ))}
            </div>
          )}
        </>
      )}

      <TablePagination totalRows={history.data?.count} />
    </MainContent>
  );
};

export default History;
