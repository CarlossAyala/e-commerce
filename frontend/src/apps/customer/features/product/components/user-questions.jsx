import { EmptyPlaceholder } from "@/components";
import { useGetProductCustomerQuestions } from "../../qa";
import { UserQuestion } from "./user-question";

export const UserQuestions = ({ productId }) => {
  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetProductCustomerQuestions(productId);

  const isEmpty = questions?.rows.length === 0;

  // TODO: Load Questions in a modal with infinite scroll
  return (
    <div className="space-y-2">
      {isLoading ? (
        <UserQuestion.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder
          title="Error"
          description={error.message}
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
