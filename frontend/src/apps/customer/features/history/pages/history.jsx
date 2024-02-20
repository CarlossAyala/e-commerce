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
} from "../../../../../components";
import { useClearHistory, useGetHistory, useRemoveHistory } from "../queries";
import { useDebounced, useDocumentTitle } from "../../../../../hooks";
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

const formatDate = (inputDate) => {
  const currentDate = new Date();
  const incomingDate = new Date(inputDate);

  const currentYear = currentDate.getFullYear();
  const inputYear = incomingDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const inputMonth = incomingDate.getMonth();

  if (currentYear === inputYear && currentMonth === inputMonth) {
    return "This month";
  } else if (currentYear === inputYear) {
    return incomingDate.toLocaleDateString("default", {
      month: "long",
    });
  } else {
    return incomingDate.toLocaleDateString("default", {
      year: "numeric",
      month: "long",
    });
  }
};

const History = () => {
  const [params] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());
  const {
    data: history,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetHistory(debouncedParams);
  useDocumentTitle("History");

  const clearHistory = useClearHistory();
  const removeHistory = useRemoveHistory();

  const handleClear = () => {
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
          description: error.message,
        });
      },
    });
  };

  const handleRemove = (productId) => {
    removeHistory.mutate(productId, {
      onSuccess: () => {
        toast({
          description: "History removed",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "History could not be removed",
          description: error.message,
        });
      },
    });
  };

  const isEmpty = isSuccess && history?.rows.length === 0;
  const groupedHistory = groupByDate(history?.rows);

  return (
    <main className="container space-y-4">
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
              onSelect={handleClear}
              disabled={isLoading || isEmpty || isError}
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
          title={error?.name ?? "Error"}
          description={error.message}
        />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No history"
          description="You haven't viewed any product yet"
        />
      ) : (
        <section className="space-y-4">
          {groupedHistory.map((group) => (
            <div key={group.date} className="space-y-1">
              <p className="text-sm font-medium capitalize">
                {formatDate(group.date)}
              </p>
              <ol className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
                {group.items.map((_history, index) => (
                  <li key={index} className="relative">
                    <ProductCard product={_history.product} />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      className="absolute right-2 top-2 bg-white shadow-md"
                      onClick={() => handleRemove(_history.product.id)}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      <Pagination totalRows={history?.count} />
    </main>
  );
};

export default History;
