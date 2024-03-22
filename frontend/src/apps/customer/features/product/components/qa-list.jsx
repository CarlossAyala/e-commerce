import { Fragment, useState } from "react";
import { useDebounced } from "@/shared/hooks";
import { EmptyState } from "@/shared/components";
import { Input, Skeleton } from "@/components";
import { useGetProductQuestions } from "../../qa";

// TODO: Add pagination
export const QAList = ({ productId }) => {
  const [search, setSearch] = useState("");
  const debounce = useDebounced(search);

  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetProductQuestions(productId, `q=${debounce}`);

  const hasQuestions = questions?.rows.length > 0;

  return (
    <>
      <Input
        className="max-w-md"
        placeholder="Find what you want to know"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h4 className="font-medium">Last made</h4>

      {isLoading ? (
        <dl>
          {new Array(3).fill("").map((_, index) => (
            <Fragment key={index}>
              <Skeleton className="mt-6 h-4" />
              <Skeleton className="mt-2 h-4" />
            </Fragment>
          ))}
        </dl>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : hasQuestions ? (
        <dl className="text-sm">
          {questions.rows.map((question) => (
            <Fragment key={question.id}>
              <dt className="mt-4 font-medium text-primary">
                {question.content}
              </dt>
              <dd className="mt-2 text-muted-foreground">
                {question.answer.content}
              </dd>
            </Fragment>
          ))}
        </dl>
      ) : !hasQuestions && search ? (
        <p className="text-sm text-muted-foreground">
          No questions found for <strong>{search}</strong>.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">No Q&A yet.</p>
      )}
    </>
  );
};
