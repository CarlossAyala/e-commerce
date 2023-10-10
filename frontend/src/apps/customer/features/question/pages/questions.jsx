import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import {
  EmptyPlaceholder,
  MainContent,
  TablePagination,
} from "../../../../../components";
import { Question } from "../components/question";
import { useGetCustomerQuestions } from "../queries";

const Questions = () => {
  const {
    data: questions,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCustomerQuestions();

  console.log("Questions", questions);

  const hasContent = isSuccess && questions?.rows.length > 0;
  const isEmpty = isSuccess && questions?.rows.length === 0;

  return (
    <MainContent className="max-w-3xl space-y-4">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">
          Questions
        </h2>
        <p className="text-muted-foreground">
          All questions that you have asked will be displayed here.
        </p>
      </section>

      <section className="space-y-4">
        {isLoading && (
          <>
            <Question.Skeleton />
            <Question.Skeleton />
            <Question.Skeleton />
            <Question.Skeleton />
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching questions
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isEmpty && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
            <EmptyPlaceholder.Title>No questions found.</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t asked any questions yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {hasContent &&
          questions.rows.map((question) => (
            <Question key={question.id} question={question} />
          ))}

        <TablePagination totalRows={questions?.count} />
      </section>
    </MainContent>
  );
};

export default Questions;
