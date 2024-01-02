import { useSearchParams } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyPlaceholder,
  MainContent,
  TablePagination,
  useToast,
} from "../../../../../components";
import { useClearHistory, useGetHistory } from "../queries";
import { useDebounced } from "../../../../../hooks";
import { ProductCard } from "../../../components/";

const groupByDate = (history) => {
  if (!Array.isArray(history) || history.length === 0) return [];

  const group = new Map();

  for (const _history of history) {
    const date = new Date(_history.lastSeenAt);
    date.setHours(0, 0, 0, 0);
    date.setDate(1);

    const ISODate = date.toISOString();
    const key = group.get(ISODate) ?? {
      date: ISODate,
      items: [],
    };
    key.items.push(_history);
    group.set(ISODate, key);
  }

  return Array.from(group.values());
};

const History = () => {
  const { toast } = useToast();
  const [params] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());
  const {
    data: history,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetHistory(debouncedParams);

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

  const isEmpty = isSuccess && history?.rows.length === 0;
  const groupedHistory = groupByDate(history?.rows);

  return (
    <MainContent className="space-y-4">
      <section className="mt-3 flex gap-4">
        <div className="scroll-m-20">
          <h1 className="text-3xl font-semibold tracking-tight">History</h1>
          <p className="mt-1 leading-tight text-muted-foreground">
            Here is the history of products that you viewed.
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
              onSelect={handleClearHistory}
              disabled={isLoading || isEmpty}
            >
              Clear history
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {isLoading ? (
        <ProductCard.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder
          title="Error fetching history"
          description={error?.message ?? "Uh oh! Something went wrong."}
        />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No history"
          description="You haven't viewed any product yet"
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          {history.rows.map((_history) => (
            <ProductCard key={_history.id} product={_history.product} />
          ))}
        </div>
      )}

      <TablePagination totalRows={history?.count} />
    </MainContent>
  );
};

export default History;
