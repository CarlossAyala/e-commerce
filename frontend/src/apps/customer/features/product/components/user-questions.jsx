import { EmptyPlaceholder } from "../../../../../components";
import { useGetProductCustomerQuestions } from "../../question";
import { UserQuestion } from "./user-question";

export const UserQuestions = ({ productId }) => {
  const {
    data: questions,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProductCustomerQuestions(productId);

  const isEmpty = isSuccess && questions.rows.length === 0;

  // TODO: Load Questions in a modal with infinite scroll
  return (
    <div className="space-y-2">
      {isLoading ? (
        <UserQuestion.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder
          title={error?.name ?? "Error"}
          description={error?.message ?? "Uh oh! Something went wrong."}
          className="py-10"
        />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No questions yet"
          description="Make your first one!"
          className="py-10"
        />
      ) : (
        questions.rows.map((question) => (
          <UserQuestion key={question.id} question={question} />
        ))
      )}
    </div>
  );
};
