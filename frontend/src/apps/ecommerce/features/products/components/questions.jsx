import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  buttonVariants,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  Spinner,
} from "@/shared/components";
import { useDebounced } from "@/shared/hooks";
import { cn } from "@/shared/utils";
import { Input, Skeleton } from "@/shared/components";
import {
  useGetProductQuestions,
  useGetProductQuestionsInfiniteScroll,
} from "../../questions";

export const Questions = ({ productId }) => {
  const [params, setParams] = useState(new URLSearchParams());
  const { ref, inView } = useInView();

  const debounce = useDebounced(params.toString());

  const {
    data: _data,
    isLoading: _isLoading,
    isError: _isError,
  } = useGetProductQuestions(productId);

  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
  } = useGetProductQuestionsInfiniteScroll(productId, debounce);

  const handleSearchChange = (e) => {
    const newParams = new URLSearchParams(params);
    newParams.set("q", e.target.value);
    setParams(newParams);
  };

  useEffect(() => {
    if (inView && !isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage({ cancelRefetch: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const search = params.get("q") || "";
  const questions = data?.pages?.flatMap((page) => page.rows);

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Last made</h4>

      {_isLoading ? (
        <div className="space-y-4">
          {new Array(3).fill("").map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : _isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !_data?.rows?.length ? (
        <div>
          <p className="text-sm text-muted-foreground">No questions found</p>
        </div>
      ) : (
        <>
          <dl className="space-y-4 text-sm">
            {_data.rows.map((question) => (
              <div key={question.id}>
                <dt className="font-medium">{question.content}</dt>
                <dd className="text-muted-foreground">{question.answer}</dd>
              </div>
            ))}
          </dl>

          {_data?.hasNextPage ? (
            <Dialog>
              <DialogTrigger
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "h-auto p-0",
                )}
              >
                Show all questions
              </DialogTrigger>
              <DialogContent className="h-auto max-w-2xl gap-0 space-y-4 overflow-auto p-0">
                <DialogHeader className="space-y-1.5 px-4 pt-4 text-start">
                  <DialogTitle>Questions</DialogTitle>
                  <DialogDescription>About this product</DialogDescription>
                </DialogHeader>
                <div className="px-4">
                  <Input
                    className="max-w-md"
                    placeholder="Find what you want to know"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="h-96 space-y-4 overflow-auto px-4 pb-4">
                  <dl className="space-y-4 overflow-auto text-sm">
                    {!questions?.length ? (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          No questions found
                        </p>
                      </div>
                    ) : (
                      questions.map((question, index) => (
                        <div
                          key={question.id}
                          ref={questions.length === index + 1 ? ref : null}
                        >
                          <dt className="font-medium">{question.content}</dt>
                          <dd className="text-muted-foreground">
                            {question.answer}
                          </dd>
                        </div>
                      ))
                    )}
                  </dl>
                  {hasNextPage && isFetchingNextPage && (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner className="size-4 text-muted-foreground" />
                      <p className="text-center text-sm leading-4 text-muted-foreground">
                        Loading more questions...
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ) : null}
        </>
      )}
    </div>
  );
};
