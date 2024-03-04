import { useDocumentTitle } from "@/shared/hooks";
import { Pagination } from "@/shared/components";
import { EmptyPlaceholder } from "@/components";
import { Question } from "../components/question";
import { useGetCustomerQuestions } from "../queries";

//TODO: Add filter by: product name, status
export const QA = () => {
  useDocumentTitle("Questions");
  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetCustomerQuestions();

  const isEmpty = questions?.rows.length === 0;

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-2">
        <h2 className="tracking-none text-3xl font-bold">Questions</h2>
        <p className="text-muted-foreground">
          All questions that you have asked will be displayed here.
        </p>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <>
            <Question.Skeleton />
            <Question.Skeleton />
            <Question.Skeleton />
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : isEmpty ? (
          <EmptyPlaceholder
            title="No questions found"
            description="You haven't asked any questions yet."
          />
        ) : (
          questions.rows.map((question) => (
            <Question key={question.id} question={question} />
          ))
        )}

        <Pagination count={questions?.count} />
      </section>
    </main>
  );
};
