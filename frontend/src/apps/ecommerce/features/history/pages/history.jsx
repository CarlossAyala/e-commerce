import { useSearchParams } from "react-router-dom";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { ProductCard } from "@/apps/ecommerce/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeaderDescription,
  PageHeaderHeading,
  URLPagination,
  Spinner,
} from "@/shared/components";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "@/shared/components";
import { useClearHistory, useGetHistory, useRemoveHistory } from "../queries";

const groupByDate = (history) => {
  const dates = new Map();

  for (const _history of history) {
    const date = new Date(_history.createdAt);
    date.setHours(0, 0, 0, 0);
    date.setDate(1);

    const ISODate = date.toISOString();
    const key = dates.get(ISODate) ?? {
      date: ISODate,
      items: [],
    };
    key.items.push(_history);
    dates.set(ISODate, key);
  }

  return Array.from(dates.values());
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
  }
  if (currentYear === inputYear) {
    return incomingDate.toLocaleDateString("default", {
      month: "long",
    });
  }

  return incomingDate.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
  });
};

export const History = () => {
  useDocumentTitle("History");
  const [params] = useSearchParams();
  const { data, isLoading, isError, error } = useGetHistory(params.toString());

  const clearHistory = useClearHistory();
  const removeHistory = useRemoveHistory();

  const handleClear = () => {
    clearHistory.mutate(null, {
      onSuccess: () => {
        toast("History cleared");
      },
    });
  };

  const handleRemove = (productId) => {
    removeHistory.mutate(productId, {
      onSuccess: () => {
        toast("History removed");
      },
    });
  };

  const isEmpty = !data?.rows.length;
  const groups = groupByDate(data?.rows ?? []);

  return (
    <main className="container flex-1 space-y-4 pb-10">
      <section className="mt-4 flex justify-between gap-4">
        <div>
          <PageHeaderHeading>History</PageHeaderHeading>
          <PageHeaderDescription>
            You can view your history here. You can also clear your history.
          </PageHeaderDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto shrink-0">
              <EllipsisVerticalIcon className="size-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onSelect={handleClear}
              disabled={isLoading || isEmpty}
            >
              {isLoading && <Spinner className="size-4" />}
              Clear history
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {isLoading ? (
        <section className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            <ProductCard.Skeleton />
            <ProductCard.Skeleton />
          </div>
        </section>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyState
          title="No history"
          description="You have not viewed any products yet"
        />
      ) : (
        <section className="space-y-4">
          {groups.map((group) => (
            <div key={group.date} className="space-y-2">
              <div>
                <p className="text-sm font-medium">{formatDate(group.date)}</p>
              </div>
              <ol className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {group.items.map((_history, index) => (
                  <li key={index} className="relative">
                    <ProductCard product={_history.product} />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      className="absolute right-2 top-2 bg-background"
                      onClick={() => handleRemove(_history.product.id)}
                    >
                      <XMarkIcon className="size-4" />
                    </Button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      <URLPagination count={data?.count} />
    </main>
  );
};
