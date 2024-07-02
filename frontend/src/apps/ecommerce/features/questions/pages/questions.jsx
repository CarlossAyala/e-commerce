import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  URLPagination,
} from "@/shared/components";
import { Question } from "../components/question";
import { useGetCustomerQuestions } from "../queries";

export const Questions = () => {
  const [param] = useSearchParams();
  useDocumentTitle("Questions");
  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetCustomerQuestions(param.toString());

  const isEmpty = questions?.rows.length === 0;

  return (
    <main className="container max-w-3xl flex-1 space-y-4 pb-10">
      <PageHeader>
        <PageHeaderHeading>Questions</PageHeaderHeading>
        <PageHeaderDescription>
          All questions that you have asked will be displayed here.
        </PageHeaderDescription>
      </PageHeader>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <Question.Skeleton />
            <Question.Skeleton />
            <Question.Skeleton />
          </>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : isEmpty ? (
          <EmptyState
            title="No questions found"
            description="You haven't asked any questions yet."
          />
        ) : (
          questions.rows.map((question) => (
            <Question key={question.id} question={question} />
          ))
        )}

        <URLPagination count={questions?.count} />
      </section>
    </main>
  );
};
