import { useState } from "react";
import { EmptyState } from "@/shared/components";
import { useDebounced } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { Input, Skeleton } from "@/shared/components";
import { useGetProductQuestions } from "../../questions";

export const Questions = ({ productId }) => {
  const [params, setParams] = useState(new URLSearchParams());
  const debounce = useDebounced(params.toString());

  const { data, isLoading, isError, error } = useGetProductQuestions(
    productId,
    debounce,
  );

  const handleSearchChange = (e) => {
    const newParams = new URLSearchParams(params);
    newParams.set("q", e.target.value);
    setParams(newParams);
  };

  const search = params.get("q") || "";

  return (
    <div className="space-y-4">
      <Input
        className="max-w-md"
        placeholder="Find what you want to know"
        value={search}
        onChange={handleSearchChange}
      />
      <h4 className="font-medium">Last made</h4>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-1/4" />

          <div className="space-y-4">
            {new Array(3).fill("").map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !data.rows.length ? (
        <div>
          <p className="text-sm text-muted-foreground">No questions found</p>
        </div>
      ) : (
        <dl className={cn("space-y-4 text-sm", isLoading && "opacity-50")}>
          {data.rows.map((question) => (
            <div key={question.id}>
              <dt className="font-medium">{question.content}</dt>
              <dd className="text-muted-foreground">{question.answer}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};
