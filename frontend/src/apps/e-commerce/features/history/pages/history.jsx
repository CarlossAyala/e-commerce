import { useSearchParams } from "react-router-dom";
import {
  DocumentIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useDocumentTitle } from "@/shared/hooks";
import { ProductCard } from "@/apps/e-commerce/components";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  Pagination,
} from "@/shared/components";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "@/components";
import { useClearHistory, useGetHistory, useRemoveHistory } from "../queries";

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

  const isEmpty = data?.rows.length === 0;
  const groupedHistory = groupByDate(data?.rows);

  return (
    <main className="container space-y-6">
      <section className="flex justify-between">
        <PageHeader>
          <PageHeaderHeading>History</PageHeaderHeading>
          <PageHeaderDescription>
            You can view your history here. You can also clear your history.
          </PageHeaderDescription>
        </PageHeader>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-auto" size="icon">
              <EllipsisVerticalIcon className="size-5" />
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
          title="No history"
          description="No history found"
        />
      ) : (
        <section className="space-y-4">
          {groupedHistory.map((group) => (
            <div key={group.date} className="space-y-1">
              <p className="text-sm font-medium capitalize">
                {formatDate(group.date)}
              </p>
              <ol className="grid grid-cols-products gap-4">
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

      <Pagination count={data?.count} />
    </main>
  );
};
