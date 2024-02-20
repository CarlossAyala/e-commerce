import { EmptyPlaceholder } from "../../../../../components";
import { useGetProductQuestions } from "../../question";
import { Question } from "./question";

export const Questions = ({ productId }) => {
  const {
    data: questions,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProductQuestions(productId);

  const isEmpty = isSuccess && questions.rows.length === 0;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <Question.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder
          title={error?.name ?? "Error"}
          description={error.message}
          className="py-10"
        />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No questions"
          description="Be the first to ask about this product."
          className="py-10"
        />
      ) : (
        questions.rows.map((question) => (
          <Question key={question.id} question={question} />
        ))
      )}
    </div>
  );
};
